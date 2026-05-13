const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

const authService = require('../services/authService');
const ROLES = require('../config/roles');
const AppError = require('../errors/AppError');

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

const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
        //validation
        if (!email) {
            return res.status(400).json({ message: "Missing required field" });
        }

        // send email to admin
        await authService.forgotPassword(email);

        //success
        res.status(200).json({ message: "Request sent" });
    } catch (err) {
        console.error("authController.login error:", err);

        res.status(500).json({ error: "Server error" });
    }
};

const resetPassword = async (req, res) => {
    try {

        const { id } = req.params;
        const password = req.body;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        //validation
        if (!id || !password) {
            return res.status(400).json({
                message: "User and password are required"
            });
        }

        const result = await authService.updatePassword(id, password);
        if (!result) {
            return res.status(500).json({ message: "Invalid" });
        }

        //success
        res.json(result);

    } catch (err) {
        console.error("reset Password error:", err);

        res.status(500).json({ error: "Server error" });
    }
};

const registerNGO = async (req, res, next) => {

    const { name, email, password, confirmPassword, areaOfConcern } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (name.length > 255) {
        return res.status(400).json({ message: "Name too long" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }
    // Password checks (dont't sanitize to not change the value)
    if (password.length < 6) {
        return res.status(400).json({ error: "Password too short" });
    }

    // validate email
    if (!validator.isEmail(email.trim())) {
        return res.status(400).json({ error: "Invalid email" });
    }

    const cleanData = {
        name: sanitizeHtml(name.trim()),
        email: email.trim(),
        password,
        area_of_concern: sanitizeHtml(areaOfConcern),
        role_id: ROLES.NGO,
    };

    try {

        const result = await authService.registerNGO(cleanData);

        res.status(201).json({
            message: "NGO registered successfully",
            userId: result.userId,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const registerVolunteer = async (req, res, next) => {

    const { name, email, password, confirmPassword, hours } = req.body;

    const resumeFile = req.files.resume?.[0] ?? null;// ?? converts only undefined or null to null
    const backgroundCheckFile = req.files.backgroundCheck?.[0] ?? null;


    if (!name || !email || !password || !hours) {
        return next(new AppError("Missing required fields", 400));
    }

    if (name.length > 255) {
        return res.status(400).json({ message: "Name too long" });
    }

    if (password !== confirmPassword) {
        return next(new AppError("Passwords do not match", 400));
    }

    // Password checks (dont't sanitize to not change the value)
    if (password.length < 6) {
        return res.status(400).json({ error: "Password too short" });
    }

    // validate email
    if (!validator.isEmail(email.trim())) {
        return res.status(400).json({ error: "Invalid email" });
    }

    try {
        
        const cleanData = {
            name: sanitizeHtml(name.trim()),
            email: email.trim(),
            password,
            hours_by_week: parseInt(hours),
            role_id: ROLES.VOLUNTEER,
            resume_filename: resumeFile ? resumeFile.filename : null,
            background_check_filename: backgroundCheckFile ? backgroundCheckFile.filename : null

        };


        const result = await authService.registerVolunteer(cleanData);

        res.status(201).json({
            message: "Volunteer registered successfully",
            userId: result.userId,
        });

    } catch (err) {
        console.error(err);
        next(err); // send to global error handler
    }
};

module.exports = { login, forgotPassword, resetPassword, registerNGO, registerVolunteer };