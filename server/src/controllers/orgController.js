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
        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        res.json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateOrganization = async (req, res) => {
    const { id } = req.params;
    const { name, email, area_of_concern } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {

        const userData = {
            name,
            email,
            area_of_concern,
            role_id: ROLES.NGO,
        };

        await orgService.updateOrganization(id, userData);
        res.status(200).json({
            message: "NGO update successfully",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getOrganizations, getOrgByID, updateOrganization };