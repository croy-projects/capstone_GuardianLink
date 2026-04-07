const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

// GET /api/users
router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/roles", userController.getRoles);

module.exports = router;