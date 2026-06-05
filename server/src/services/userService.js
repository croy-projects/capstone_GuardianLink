//Services : logic + DB
const bcrypt = require('bcrypt');
const pool = require('../db');
const ROLES = require('../config/roles');
const orgService = require("./orgService");
const volunteerService = require("./volunteerService");
const AppError = require('../errors/AppError');
const { deleteFile } = require("../utils/files");

const getUsers = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, r.name AS role, v.resume, v.background_check, v.background_check_status
      FROM users u
      JOIN roles r ON u.role_id = r.id
      LEFT JOIN volunteers v ON v.user_id = u.id
    `);
    } finally {
        conn.release();
    }
};

const getUserByID = async (id) => {
    const conn = await pool.getConnection();

    try {
        const rows = await conn.query(`
        SELECT u.id, u.name, u.email, u.role_id, r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.id = ? 
        `, [id]);

        return rows[0];

    } finally {
        conn.release();
    }

};


const createUser = async (user) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        const { name, email, role_id, password, hours_by_week, area_of_concern, resume_filename, background_check_filename } = user;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await conn.query(
            'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role_id]
        );
        const user_id = Number(result.insertId);

        const dataUser = {
            hours_by_week,
            area_of_concern,
            user_id: Number(result.insertId),
            resume_filename,
            background_check_filename
        }
        if (Number(role_id) === ROLES.NGO) {
            await orgService.createOrganization(dataUser, conn);
        }
        if (Number(role_id) === ROLES.VOLUNTEER) {
            await volunteerService.createVolunteer(dataUser, conn);
        }

        await conn.commit();

        return { userId: user_id };


    } catch (err) {
        if (conn) await conn.rollback();
        throw err;
    } finally {
        if (conn) conn.release();
    }

};

const updateUser = async (id, user) => {
    const conn = await pool.getConnection();

    try {
        const { name, email, role_id, old_role_id,
            hours_by_week, area_of_concern,
            resume_filename, background_check_filename,
            background_check_status, background_check_reviewed_by
        } = user;


        let result;

        await conn.beginTransaction();

        if (role_id) {
            result = await conn.query(
                `UPDATE users
            SET name = ?, email = ?, role_id = ?
            WHERE id = ?`,
                [name, email, role_id, id]
            );
        } else {
            result = await conn.query(
                `UPDATE users
            SET name = ?, email = ?
            WHERE id = ?`,
                [name, email, id]
            );

        }

        // When the role changes, delete the existing row from the previous role's table and create a new row in the current role's table.
        if (Number(old_role_id) !== Number(role_id)) {
            if (old_role_id === ROLES.NGO) {
                orgService.deleteOrganization(id, conn);
                volunteerService.createVolunteer(
                    {
                        user_id: id, hours_by_week: hours_by_week,
                        resume_filename: resume_filename, background_check_filename: background_check_filename,

                    }
                    , conn);
            }
            if (old_role_id === ROLES.VOLUNTEER) {
                volunteerService.deleteVolunteer(id, conn);
                orgService.createOrganization({ user_id: id, area_of_concern: area_of_concern }, conn);
            }
        } else {

            if (Number(role_id) === ROLES.NGO) {
                orgService.updateOrganization(id, { user_id: id, area_of_concern: area_of_concern }, conn);
            }
            if (Number(role_id) === ROLES.VOLUNTEER) {
                volunteerService.updateVolunteer(id
                    , {
                        user_id: id, hours_by_week: hours_by_week,
                        resume_filename: resume_filename, background_check_filename: background_check_filename,
                        background_check_status, background_check_reviewed_by
                    }
                    , conn);
            }

        }

        await conn.commit();

        return result;

    } catch (err) {
        if (conn) await conn.rollback();
        throw err;
    } finally {
        if (conn) conn.release();
    }

};

const deleteUserAndFiles = async (id) => {

    const user = await getUserByID(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role_id === ROLES.VOLUNTEER) {

        const volunteer = await volunteerService.getVolunteerByID(id);

        await deleteUser(id);

        if (volunteer?.resume) {
            await deleteFile(volunteer.resume);
        }

        if (volunteer?.background_check) {
            await deleteFile(volunteer.background_check);
        }
    } else {
        await deleteUser(id);
    }
};

const deleteUser = async (id) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM users WHERE id=?', [id]);
    } finally {
        conn.release();
    }
};

const getRoles = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT r.id, r.name AS role
        FROM roles r
    `);
    } finally {
        conn.release();
    }
};

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser, deleteUserAndFiles, getRoles };