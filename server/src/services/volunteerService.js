//Services : logic + DB
const pool = require('../db');

const getVolunteers = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
        SELECT u.id, u.name, u.email, v.hours_by_week, v.resume, v.background_check
        FROM users u
        JOIN volunteers v ON u.id = v.user_id
    `);
    } finally {
        conn.release();
    }
};

const getVolunteerByID = async (id) => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, u.role_id, r.name AS role, v.hours_by_week, v.resume, v.background_check
      FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN volunteers v ON u.id = v.user_id
      WHERE u.id = ?
    `, [id]);
    } finally {
        conn.release();
    }
};

const createVolunteer = async (data, connTrx) => {
    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    const { user_id, hours_by_week, resume_filename=null, background_check_filename=null } = data;

    try {
        const res = await conn.query(
            'INSERT INTO volunteers (user_id, hours_by_week, resume, background_check) VALUES (?, ?, ?, ?)',
            [user_id, hours_by_week, resume_filename, background_check_filename]
        );
    }
    catch(err){
        console.log("create vol", err)
    }
    finally {
        if (!connTrx) {
            conn.release();
        }

    }
};

const updateVolunteer = async (id, data, connTrx) => {
    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    try {
        const { hours_by_week } = data;

        const result = await conn.query(
            `UPDATE volunteers
            SET hours_by_week = ?
            WHERE user_id = ?`,
            [hours_by_week, id]
        );

    } finally {
        if (!connTrx) {
            conn.release();
        }

    }
};

const deleteVolunteer = async (id, connTrx) => {
    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    try {
        await conn.query('DELETE FROM volunteers WHERE user_id=?', [id]);
    } finally {
        if (!connTrx) {
            conn.release();
        }

    }
};


module.exports = { getVolunteers, createVolunteer, updateVolunteer, getVolunteerByID, deleteVolunteer };