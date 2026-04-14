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

const getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.id);
        res.json(user[0]);
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

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role_id } = req.body;
        await userService.updateUser(id, { name, email, role_id });
        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await userService.getRoles();
        res.json(roles);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser, getRoles };