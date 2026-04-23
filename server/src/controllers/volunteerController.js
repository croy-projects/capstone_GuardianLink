//Controllers = HTTP only
const volunteerService = require('../services/volunteerService');

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await volunteerService.getVolunteers();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVolunteerByID = async (req, res) => {
    try {
        const user = await volunteerService.getVolunteerByID(req.params.id);
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
        await volunteerService.updateVolunteer(id, { hours });
        res.status(200).json({ message: 'Volunteer updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getVolunteers, getVolunteerByID, createVolunteer, updateVolunteer };