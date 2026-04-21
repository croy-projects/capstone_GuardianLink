const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

router.post("/login", authController.login);
router.post("/register-ngo", authController.registerNGO);
router.post("/register-volunteer", upload.single("resume"), authController.registerVolunteer);

module.exports = router;