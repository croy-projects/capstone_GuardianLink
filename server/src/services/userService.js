//Services : logic + DB
const pool = require('../db');

const getUsers = async () => {
  const conn = await pool.getConnection();

  try {
    return await conn.query(`
      SELECT u.id, u.name, u.email, u.password, r.name AS role
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
      SELECT u.id, u.name, u.email, u.password, u.role_id, r.name AS role
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

  try {
    const { name, email, role_id, password } = user;
    await conn.query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      [name, email, password, role_id]
    );
  } finally {
    conn.release();
  }
};

const updateUser = async (id, user) => {
  const conn = await pool.getConnection();

  try {
    const { name, email, role_id } = user;

    const result = await conn.query(
      `UPDATE users
        SET name = ?, email = ?, role_id = ?
        WHERE id = ?`,
      [name, email, role_id, id]
    );

    return result;
  } finally {
    conn.release();
  }
};

const deleteUser = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('DELETE FROM users WHERE id=?', [id]);
  }  finally {
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