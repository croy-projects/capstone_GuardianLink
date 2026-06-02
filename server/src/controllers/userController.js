//Controllers = HTTP only
const userService = require('../services/userService');
const orgService = require('../services/orgService');
const volunteerService = require('../services/volunteerService');
const { validateVolunteer, validateNGO, validateAdmin } = require("../utils/validation");

const ROLES = require('../config/roles');
const AppError = require('../errors/AppError');

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

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role_id, hours_by_week, area_of_concern, old_role_id } = req.body;

        const userData = {
            name,
            email,
            role_id,
            old_role_id,
            hours_by_week,
            area_of_concern
        };

        //Only admins or owner can change user info
        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        //Only admins can change roles
        if (req.user.role_id !== ROLES.ADMIN && (!old_role_id || !role_id || old_role_id !== role_id)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        let errors ={}, cleanData = {};

        if (Number(userData.role_id) === ROLES.VOLUNTEER) {
            ({ errors, cleanData } = validateVolunteer(userData));
        }

        if (Number(userData.role_id) === ROLES.NGO) {
            ({ errors, cleanData } = validateNGO(userData));
        }
        
        if (Number(userData.role_id) === ROLES.ADMIN) {
            ({ errors, cleanData } = validateAdmin(userData));

        }

        if (Object.keys(errors).length > 0) {
            const message = Object.values(errors).join(", ");
            const error = new AppError(message, 400);
            error.errors = errors;
            return next(error);
        }

        if (req.files) {
            const resumeFile = req.files.resume?.[0] ?? null;// ?? converts only undefined or null to null
            const backgroundCheckFile = req.files.backgroundCheck?.[0] ?? null;
            cleanData.resume_filename = resumeFile ? resumeFile.filename : null;
            cleanData.background_check_filename = backgroundCheckFile ? backgroundCheckFile.filename : null;
        }

        await userService.updateUser(id, cleanData);

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