//Controllers = HTTP only
const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await userService.getRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getUsers, createUser, getRoles };