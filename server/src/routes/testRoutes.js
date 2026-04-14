const express = require("express");
const router = express.Router();

// Define a simple test route
// GET /api/test
router.get("/test", (req, res) => {
    res.json({
        message: "API test routes is working"
    });
});

module.exports = router;