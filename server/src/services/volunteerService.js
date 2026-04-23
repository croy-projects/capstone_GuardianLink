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

const createVolunteer = async (data, conn) => {
    const { user_id, hours, resume_filename, background_check_filename } = data;

    await conn.query(
        'INSERT INTO volunteers (user_id, hours_by_week, resume, background_check) VALUES (?, ?, ?, ?)',
        [user_id, hours, resume_filename, background_check_filename]
    );
};

module.exports = { getVolunteers, createVolunteer };