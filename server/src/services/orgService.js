//Services : logic + DB
const pool = require('../db');

const getOrganizations = async () => {
    const conn = await pool.getConnection();

    try {
        return await conn.query(`
      SELECT u.id, u.name, u.email, o.area_of_concern
      FROM users u
      JOIN organizations o ON u.id = o.user_id
    `);
    } finally {
        conn.release();
    }
};

const getOrgByID = async (id) => {
    const conn = await pool.getConnection();

    try {

        const rows = await conn.query(`
            SELECT u.id, u.name, u.email, u.role_id, r.name AS role, o.area_of_concern
            FROM users u
            JOIN roles r ON u.role_id = r.id
            JOIN organizations o ON o.user_id = u.id
            WHERE u.id = ?
            `, [id]);

        return rows[0];

    } finally {
        conn.release();
    }
};

const createOrganization = async (data, connTrx) => {
    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    const { user_id, area_of_concern } = data;
    try {
        await conn.query(
            'INSERT INTO organizations (user_id, area_of_concern) VALUES (?, ?)',
            [user_id, area_of_concern]
        );

    }
    catch (err) {
        console.log("create organization error", err);
        throw err;
    }
    finally {
        if (!connTrx) {
            conn.release();
        }

    }
};

const updateOrganization = async (id, data, connTrx) => {

    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    try {
        const { area_of_concern } = data;
        await conn.query(
            `UPDATE organizations
            SET area_of_concern = ?
            WHERE user_id = ?`,
            [area_of_concern, id]
        );

    } finally {
        if (!connTrx) {
            conn.release();
        }

    }
};

const deleteOrganization = async (id, connTrx) => {
    let conn;
    if (connTrx) {
        conn = connTrx;
    } else {
        conn = await pool.getConnection();
    }

    try {
        await conn.query('DELETE FROM organizations WHERE user_id=?', [id]);
    } finally {
        if (!connTrx) {
            conn.release();
        }

    }
};

module.exports = { getOrganizations, getOrgByID, createOrganization, updateOrganization, deleteOrganization };