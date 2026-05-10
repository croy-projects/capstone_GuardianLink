//Controllers = HTTP only
const volunteerService = require('../services/volunteerService');
const ROLES = require('../config/roles');

const getVolunteers = async (req, res) => {
    try {
        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.NGO) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const volunteers = await volunteerService.getVolunteers();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVolunteerByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.NGO && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }        
        const user = await volunteerService.getVolunteerByID(id);
        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createVolunteer = async (req, res) => {
    try {
        await volunteerService.createVolunteer(req.body);
        res.status(201).json({ message: 'Volunteer created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const { hours } = req.body;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }        
        await volunteerService.updateVolunteer(id, { hours });
        res.status(200).json({ message: 'Volunteer updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getVolunteers, getVolunteerByID, createVolunteer, updateVolunteer };