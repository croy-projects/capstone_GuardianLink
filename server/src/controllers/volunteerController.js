//Controllers = HTTP only
const volunteerService = require('../services/volunteerService');
const ROLES = require('../config/roles');
const path = require("path");

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
        if (!user.length) {
            return res.status(404).json({
                message: "Volunteer not found"
            });
        }
        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVolunteerFile = async (req, res) => {
    try {

        const { id, filename } = req.params;

        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.NGO && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const filePath = path.resolve(__dirname,"..","..", process.env.UPLOAD_DIR, filename);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
        res.sendFile(filePath);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// used? todo remove

// const createVolunteer = async (req, res) => {
//     try {
//         await volunteerService.createVolunteer(req.body);
//         res.status(201).json({ message: 'Volunteer created' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// used? todo remove
// const updateVolunteer = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { hours_by_week, resume_filename = null, background_check_filename = null, background_check_status } = req.body;

//         if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
//             return res.status(403).json({ error: "Forbidden" });
//         }

//         let background_check_reviewed_bY;
//         if(req.user.role_id === ROLES.ADMIN){
//             background_check_reviewed_by = req.user.id;
//         }
//         await volunteerService.updateVolunteer(id, { hours_by_week, resume_filename, background_check_filename, background_check_status, background_check_reviewed_by });
//         res.status(200).json({ message: 'Volunteer updated' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

module.exports = { getVolunteers, getVolunteerByID, getVolunteerFile };