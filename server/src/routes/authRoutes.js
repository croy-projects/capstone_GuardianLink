const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

router.post("/login", authController.login);
router.post("/register-ngo", authController.registerNGO);

const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "backgroundCheck", maxCount: 1 },
]);

router.post("/register-volunteer", uploadFields, authController.registerVolunteer);

module.exports = router;