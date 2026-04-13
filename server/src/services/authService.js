//Services : logic + DB
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const pool = require('../db');

const login = async (email, password) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT u.name, u.email, u.password, u.role_id
            FROM users u
            WHERE u.email = ?
        `, [email]);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return null;
        }

        const token = jwt.sign(
        {
            id: user.id,
            role: user.role_id
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );        

        return {
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };

    } catch(err) {
        console.log("authService.login error:", err);
        throw err;
    } finally {
        conn.release();
    }
};

module.exports = { login };