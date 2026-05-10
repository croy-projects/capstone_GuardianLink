//Controllers = HTTP only
const orgService = require('../services/orgService');
const ROLES = require('../config/roles');

const getOrganizations = async (req, res) => {
    try {
        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.VOLUNTEER) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const organizations = await orgService.getOrganizations();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrgByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.VOLUNTEER && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }        
        const organization = await orgService.getOrgByID(id);
        res.json(organization[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getOrganizations, getOrgByID };