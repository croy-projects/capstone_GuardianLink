//Controllers = HTTP only
const orgService = require('../services/orgService');
const ROLES = require('../config/roles');

const getOrganizations = async (req, res, next) => {
    try {
        if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.VOLUNTEER) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const organizations = await orgService.getOrganizations();
        res.json(organizations);
    } catch (err) {
        next(err);
    }
};

const getOrgByID = async (req, res, next) => {
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
        next(err);
    }
};

// Used? todo remove
// const updateOrganization = async (req, res, next) => {
//     const { id } = req.params;
//     const { name, email, area_of_concern } = req.body;

//     if (!name || !email) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }
//     try {

//         const userData = {
//             name,
//             email,
//             area_of_concern,
//             role_id: ROLES.NGO,
//         };

//         await orgService.updateOrgfanization(id, userData);
//         res.status(200).json({
//             message: "NGO update successfully",
//         });

//     } catch (err) {
//         next(err);
//         // console.error(err);
//         // res.status(500).json({ message: "Server error" });
//     }
// };

module.exports = { getOrganizations, getOrgByID };