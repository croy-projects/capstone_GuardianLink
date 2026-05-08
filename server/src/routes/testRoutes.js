const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");
// Define a simple test route
// GET /api/test
router.get("/test", (req, res) => {
    res.json({
        message: "API test routes is working"
    });
});
// Define a simple test email route
router.get("/test-email", emailController.sendEmail);

module.exports = router;