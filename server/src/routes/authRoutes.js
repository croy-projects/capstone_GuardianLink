const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const { authenticate } = require("../middleware/authMiddleware");

router.post("/login", authController.login);

router.put("/reset-password/:id", authenticate, authController.resetPassword);

router.post("/forgot-password", authController.forgotPassword);

router.post("/register-ngo", authController.registerNGO);

const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "background_check", maxCount: 1 },
]);

router.post("/register-volunteer", uploadFields, authController.registerVolunteer);

module.exports = router;