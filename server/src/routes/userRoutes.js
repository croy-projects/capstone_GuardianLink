const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

// GET /api/users
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

//Put specific routes first to avoid conflict
router.get("/roles", userController.getRoles);

router.get("/:id", userController.getUserByID);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;