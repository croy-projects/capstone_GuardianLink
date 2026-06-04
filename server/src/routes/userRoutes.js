const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
const volunteerController = require('../controllers/volunteerController');
const orgController = require('../controllers/orgController');
const ROLES = require('../config/roles');
const upload = require("../middleware/uploadMiddleware");

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
router.get("/volunteers/:id/:filename", authenticate, volunteerController.getVolunteerFile);
router.get("/ngos/:id", authenticate, orgController.getOrgByID);

// pass files
const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "background_check", maxCount: 1 },
]);
router.put("/:id", authenticate, uploadFields, userController.updateUser);

// Used? todo remove
//router.put("/volunteers/:id", authenticate, uploadFields, volunteerController.updateVolunteer);
//router.put("/ngos/:id", authenticate, orgController.updateOrganization);

router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;