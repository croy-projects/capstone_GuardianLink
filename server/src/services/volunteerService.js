//Services : logic + DB
const pool = require('../db');

const getVolunteers = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, v.hours_by_week
      FROM users u
      JOIN volunteers v ON u.role_id = r.id
    `);
    } finally {
        conn.release();
    }
};

const createVolunteer = async (data, conn) => {

    const { user_id, hours, resume } = data;

    await conn.query(
        'INSERT INTO volunteers (user_id, hours_by_week, resume) VALUES (?, ?, ?)',
        [user_id, hours, resume]
    );
};

const deleteVolunteer = async (id) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM volunteers WHERE id=?', [id]);
    } finally {
        conn.release();
    }
};

module.exports = { getVolunteers, createVolunteer, deleteVolunteer };