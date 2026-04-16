const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register-ngo", authController.registerNGO);
router.post("/register-volunteer", authController.registerVolunteer);

module.exports = router;