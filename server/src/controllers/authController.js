const authService = require('../services/authService');
const ROLES = require('../config/roles');

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

const registerNGO = async (req, res) => {
    const { name, email, password, confirmPassword, areaOfConcern } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }

    try {

        const userData = {
            name,
            email,
            password,
            areaOfConcern,
            role_id: ROLES.NGO,
        };

        const result = await authService.registerNGO(userData);


        res.status(201).json({
            message: "NGO registered successfully",
            userId: result.userId,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const registerVolunteer = async (req, res) => {

    const { name, email, password, confirmPassword, hours } = req.body;

    if (!name || !email || !password || !hours) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }

    try {

        const userData = {
            name,
            email,
            password,
            hours,
            role_id: ROLES.VOLUNTEER,
        };

        const result = await authService.registerVolunteer(userData);


        res.status(201).json({
            message: "Volunteer registered successfully",
            userId: result.userId,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login, registerNGO, registerVolunteer };