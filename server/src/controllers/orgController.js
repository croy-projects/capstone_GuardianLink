//Controllers = HTTP only
const orgService = require('../services/orgService');

const getOrganizations = async (req, res) => {
    try {
        const organizations = await orgService.getOrganizations();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrgByID = async (req, res) => {
    try {
        const organization = await userService.getOrganizationByID(req.params.id);
        res.json(organization[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOrganization = async (req, res) => {
    try {
        // await userService.deleteUser(req.body);
        // await orgService.deleteOrganization(req.body);
        // res.status(400).json({ message: 'Organization deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getOrganizations, getOrgByID, deleteOrganization };