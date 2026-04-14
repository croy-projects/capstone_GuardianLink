//Services : logic + DB
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const pool = require('../db');
const userService = require("./userService");
const orgService = require("./orgService");

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
            role_id: user.role_id
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

const registerNGO = async (data) => {
  let conn;

  try {

    conn = await pool.getConnection();
    await conn.beginTransaction();

    // Check existing user
    const existing = await conn.query(
      "SELECT id FROM users WHERE email = ?",
      [data.email]
    );

    if (existing.length > 0) {
      throw new Error("Email already registered");
    }

    const { userId } = await userService.createUser(data, conn);
    data.user_id = userId

    await orgService.createOrganization(data, conn);

    await conn.commit();

    return { userId };

  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { login, registerNGO };