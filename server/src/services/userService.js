//Services : logic + DB
const bcrypt = require('bcrypt');
const pool = require('../db');
const ROLES = require('../config/roles');
const orgService = require("./orgService");
const volunteerService = require("./volunteerService");

const getUsers = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `);
    } finally {
        conn.release();
    }
};

const getUserByID = async (id) => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, u.role_id, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ? 
    `, [id]);
    } finally {
        conn.release();
    }
};


const createUser = async (user) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        const { name, email, role_id, password, hours_by_week, area_of_concern } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await conn.query(
            'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role_id]
        );
        const user_id = Number(result.insertId);

        const dataUser = {
            hours_by_week,
            area_of_concern,
            user_id: Number(result.insertId)
        }
        if (Number(role_id) === ROLES.NGO) {
            orgService.createOrganization(dataUser, conn);
        }
        if (Number(role_id) === ROLES.VOLUNTEER) {
            volunteerService.createVolunteer(dataUser, conn);
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

        const { name, email, role_id, old_role_id, hours_by_week, area_of_concern } = user;

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

        if (old_role_id !== role_id) {
            if (old_role_id === ROLES.NGO) {
                orgService.deleteOrganization(id, conn);
                volunteerService.createVolunteer({ user_id: id, hours_by_week: hours_by_week }, conn);
            }
            if (old_role_id === ROLES.VOLUNTEER) {
                volunteerService.deleteVolunteer(id, conn);
                orgService.createOrganization({ user_id: id, area_of_concern: area_of_concern }, conn);
            }
        } else {
            if (role_id === ROLES.NGO) {
                orgService.updateOrganization(id, { user_id: id, area_of_concern: area_of_concern }, conn);
            }
            if (role_id === ROLES.VOLUNTEER) {
                volunteerService.updateVolunteer(id, { user_id: id, hours_by_week: hours_by_week }, conn);
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

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser, getRoles };