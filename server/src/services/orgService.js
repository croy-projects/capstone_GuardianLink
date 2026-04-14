//Services : logic + DB
const pool = require('../db');

const getOrganizations = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, o.area_of_concern
      FROM users u
      JOIN organizations o ON u.role_id = r.id
    `);
    } finally {
        conn.release();
    }
};

const createOrganization = async (data, conn) => {

    const { user_id, areaOfConcern } = data;

    await conn.query(
        'INSERT INTO organizations (user_id, area_of_concern) VALUES (?, ?)',
        [user_id, areaOfConcern]
    );
};

const deleteOrganization = async (id) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM organizations WHERE id=?', [id]);
    } finally {
        conn.release();
    }
};

module.exports = { getOrganizations, createOrganization, deleteOrganization };