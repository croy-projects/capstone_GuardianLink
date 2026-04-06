const pool = require('../db');

// GET all users
exports.getUsers = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const users = await conn.query('SELECT u.*, r.name role FROM users u JOIN roles r WHERE r.id = u.role_id');
    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });

  } finally {
    if (conn) conn.release();
  }
};
