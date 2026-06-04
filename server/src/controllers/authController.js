const { validateVolunteer, validateNGO } = require("../utils/validation");

const authService = require('../services/authService');
const ROLES = require('../config/roles');
const AppError = require('../errors/AppError');

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return next(new AppError("Email and password are required", 400));
        }

        const result = await authService.login(email, password);
        if (!result) {
            return next(new AppError("Invalid credentials", 401));
        }

        //success
        res.json(result);
    } catch (err) {
        console.error("authController.login error:", err);

        res.status(500).json({ error: "Server error" });
    }
};

const forgotPassword = async (req, res, next) => {

    try {
        const { email } = req.body;
        //validation
        if (!email) {
            return next(new AppError("Missing required field", 400));
        }

        // send email to admin
        await authService.forgotPassword(email);

        //success
        res.status(200).json({ message: "Request sent" });
    } catch (err) {
        console.error("authController.forgotPassword error:", err);

        res.status(500).json({ error: "Server error" });
    }
};

const resetPassword = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { password } = req.body;

        if (req.user.role_id !== ROLES.ADMIN && req.user.id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        //validation
        if (!id || !password) {
            return next(new AppError("User and password are required", 400));
        }

        const result = await authService.updatePassword(id, password);
        if (!result) {
            return res.status(500).json({ message: "Error server reset password" });
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

    const userData = {
        name,
        email,
        password,
        confirmPassword,
        area_of_concern: areaOfConcern
    };

    const { errors, cleanData } = validateNGO(userData, true);

    if (Object.keys(errors).length > 0) {
        const message = Object.values(errors).join(", ");
        const error = new AppError(message, 400);
        error.errors = errors;
        return next(error);
    }

    try {

        const result = await authService.registerNGO(cleanData);

        res.status(201).json({
            message: "NGO registered successfully",
            userId: result.userId,
        });

    } catch (err) {
        next(err);
    }
};


const registerVolunteer = async (req, res, next) => {

    const { name, email, password, confirmPassword, hours_by_week } = req.body;

    const userData = {
        name,
        email,
        password,
        confirmPassword,
        hours_by_week
    };

    const { errors, cleanData } = validateVolunteer(userData, true);

    if (Object.keys(errors).length > 0) {
        const message = Object.values(errors).join(", ");
        const error = new AppError(message, 400);
        error.errors = errors;
        return next(error);
    }

    if (req.files) {
        const resumeFile = req.files.resume?.[0] ?? null;// ?? converts only undefined or null to null
        const backgroundCheckFile = req.files.background_check?.[0] ?? null;
        cleanData.resume_filename = resumeFile ? resumeFile.filename : null;
        cleanData.background_check_filename = backgroundCheckFile ? backgroundCheckFile.filename : null;
    }

    try {
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