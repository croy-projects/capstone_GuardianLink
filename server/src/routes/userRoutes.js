const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
const volunteerController = require('../controllers/volunteerController');
const orgController = require('../controllers/orgController');
const ROLES = require('../config/roles');

const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

// GET /api/users
router.get("/", authenticate, authorizeRole(ROLES.ADMIN), userController.getUsers);

router.get("/volunteers", authenticate, authorizeRole(ROLES.ADMIN, ROLES.NGO), volunteerController.getVolunteers);
router.get("/ngos", authenticate, authorizeRole(ROLES.ADMIN, ROLES.VOLUNTEER), orgController.getOrganizations);

router.get("/profile", authenticate, userController.getProfile);

// POST
router.post("/", authenticate, userController.createUser);

//Put specific routes first to avoid conflict
router.get("/roles", authenticate, userController.getRoles);

router.get("/:id", authenticate, userController.getUserByID);
router.get("/volunteers/:id", authenticate, volunteerController.getVolunteerByID);
router.get("/ngos/:id", authenticate, orgController.getOrgByID);

router.put("/:id", authenticate, userController.updateUser);
router.put("/volunteers/:id", authenticate, volunteerController.updateVolunteer);
router.put("/ngos/:id", authenticate, orgController.updateOrganization);

router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;