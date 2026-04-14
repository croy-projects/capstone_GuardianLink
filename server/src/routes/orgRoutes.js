const express = require("express");
const router = express.Router();

const orgController = require('../controllers/orgController');

const { authenticate } = require("../middleware/authMiddleware");

// GET /api/users
router.get("/", authenticate, orgController.getOrganizations);

router.get("/:id", authenticate, orgController.getOrgByID);

router.delete("/:id", authenticate, orgController.deleteOrganization);

module.exports = router;