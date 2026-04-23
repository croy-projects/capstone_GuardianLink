const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
const volunteerController = require('../controllers/volunteerController');

const { authenticate } = require("../middleware/authMiddleware");

// GET /api/users
router.get("/", authenticate, userController.getUsers);

router.get("/volunteers", authenticate, volunteerController.getVolunteers);

// POST
router.post("/", authenticate, userController.createUser);

//Put specific routes first to avoid conflict
router.get("/roles", authenticate, userController.getRoles);

router.get("/:id", authenticate, userController.getUserByID);

router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;