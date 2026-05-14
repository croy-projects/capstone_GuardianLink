//Services : logic + DB
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const pool = require('../db');
const userService = require("./userService");
const orgService = require("./orgService");
const volunteerService = require("./volunteerService");
const emailService = require('../services/emailService');
const ROLES = require('../config/roles');
const AppError = require('../errors/AppError');

const login = async (email, password) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT u.id, u.name, u.email, u.password, u.role_id
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
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id
            }
        };

    } catch (err) {
        console.log("authService.login error:", err);
        throw err;
    } finally {
        conn.release();
    }
};

const forgotPassword = async (email) => {

    const emailAdmin = process.env.MAIL_ADMIN;
    const emailUser = email;
    const subject = "Forgot Password";
    const message = `A password reset request was made for the account associated with: ${emailUser}`;

    await emailService.sendEmail(emailAdmin, subject, message);

};

const updatePassword = async (userId, password) => {
    const conn = await pool.getConnection();

    try {
        const hashedPassword = await bcrypt.hash(password.password, 10);

        const result = await conn.query(
            `UPDATE users
        SET password = ?
        WHERE id = ?`,
            [hashedPassword, userId]
        );

        result.insertId = Number(result.insertId);
        return result;

    } finally {
        conn.release();
    }
};

const registerNGO = async (data) => {
    const conn = await pool.getConnection();

    try {

        // Check existing user
        const existing = await conn.query(
            "SELECT id FROM users WHERE email = ?",
            [data.email]
        );

        if (existing.length > 0) {
            throw new AppError("Email already registered", 400);
        }
        
        data.role_id = ROLES.NGO;
        const { userId } = await userService.createUser(data, conn);

        return { userId };
    }
    finally {
        if (conn) conn.release();
    }
};

const registerVolunteer = async (data) => {
    const conn = await pool.getConnection();

    try {
       
        // Check existing user
        const existing = await conn.query(
            "SELECT id FROM users WHERE email = ?",
            [data.email]
        );

        if (existing.length > 0) {
            throw new AppError("Email already registered", 400);
        }

        data.role_id = ROLES.VOLUNTEER;
        const { userId } = await userService.createUser(data);

        return { userId };

    } finally {
        if (conn) conn.release();
    }

};

module.exports = { login, forgotPassword, updatePassword, registerNGO, registerVolunteer };