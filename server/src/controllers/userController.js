//Controllers = HTTP only
const userService = require('../services/userService');
const orgService = require('../services/orgService');
const volunteerService = require('../services/volunteerService');
const ROLES = require('../config/roles');

const getUsers = async (req, res) => {
    try {
        if (req.user.role_id !== ROLES.ADMIN) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const user = await userService.getUserByID(id);
        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        if (req.user.role_id !== ROLES.ADMIN) {
            return res.status(403).json({ error: "Forbidden" });
        }
        await userService.createUser(req.body);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.log("create user err", err);
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role_id, hours_by_week, area_of_concern, old_role_id } = req.body;

        const userData = {
            name,
            email,
            role_id,
            hours_by_week,
            area_of_concern,
            old_role_id
        };

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        //Only admins can change roles
        if (req.user.role_id !== ROLES.ADMIN && old_role_id !== role_id) {
            return res.status(403).json({ error: "Forbidden" });
        }


        await userService.updateUser(id, userData);

        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        await userService.deleteUser(id);
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

const getProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const role_id = req.user.role_id;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id !== user_id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        let data = {};

        if (role_id === ROLES.ADMIN) {
            data = await userService.getUserByID(user_id);
        }

        if (role_id === ROLES.NGO) {
            data = await orgService.getOrgByID(user_id);
        }

        if (role_id === ROLES.VOLUNTEER) {
            data = await volunteerService.getVolunteerByID(user_id);
        }

        res.json(data[0]);

    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser, getRoles, getProfile };