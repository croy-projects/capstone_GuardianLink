const authService = require('../services/authService');

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).json({
            message: "Email and password are required"
         });
        }

        const result = await authService.login(email, password);
        if (!result) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //success
        res.json(result);
    } catch (err) {
        console.error("authController.login error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { login };