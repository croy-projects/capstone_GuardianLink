const sanitizeHtml = require("sanitize-html");
const validator = require("validator");


const sanitize = (value) => {
    if (typeof value !== "string") return value;
    return sanitizeHtml(value.trim(), {
        allowedTags: [],
        allowedAttributes: {}
    });
};

const validateName = (name) => {
    if (!name) return "Name is required";

    if (name.length > 254) {
        return "Name too long";
    }

    const clean = sanitize(name);
    //Whitelisting only allowed specific characters
    const regex = /^[a-zA-Z\s'-]+$/;
    if (!regex.test(clean)) {
        return "Name contains invalid characters";
    }

    return null;
};

const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (email.length > 254) return "Email is too long";
    if (!validator.isEmail(email)) return "Invalid email format";
    return null;
};


const validatePassword = (password) => {
    // Password checks (dont't sanitize to not change the value)

    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 100) return "Password is too long";

    const regex = /^[A-Za-z0-9!@#$%^&*]+$/;
    if (!regex.test(password)) {
        return "Password : Allowed symbols: ! @ # $ % ^ & *";
    }

    return null;
};

const validateHours = (hours) => {
    if (hours === undefined) return "Hours are required";

    const num = Number(hours);

    if (isNaN(num)) return "Hours must be a number";
    if (!Number.isInteger(num)) return "Hours must be an integer";
    if (num < 1 || num > 100) return "Hours must be between 1 and 100";

    return null;
};


const validateArea = (text) => {
    if (!text) {
        return "Area of concern is required";
    }

    if (typeof text !== "string") {
        return "Area of Concern : Invalid input";
    }

    if (text.length > 5000) {
        return "Area of Concern too long";
    }

    return null;
};


const validateVolunteer = (data) => {
    const errors = {};

    const cleanData = {
        name: sanitize(data.name?.trim()),
        email: data.email?.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        hours_by_week: data.hours

    };

    errors.name = validateName(cleanData.name);
    errors.email = validateEmail(cleanData.email);
    errors.password = validatePassword(cleanData.password);
    errors.hours = validateHours(cleanData.hours_by_week);

    if (cleanData.password !== cleanData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    // remove nulls
    Object.keys(errors).forEach(
        (key) => errors[key] === null && delete errors[key]
    );

    return {
        errors,
        cleanData
    };
};

const validateNGO = (data) => {
    const errors = {};
    const cleanData = {
        name: sanitize(data.name?.trim()),
        email: data.email?.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        area_of_concern: sanitize(data.areaOfConcern)
    };

    errors.name = validateName(cleanData.name);
    errors.email = validateEmail(cleanData.email);
    errors.password = validatePassword(cleanData.password);
    errors.areaOfConcern = validateArea(cleanData.area_of_concern);

    if (cleanData.password !== cleanData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    Object.keys(errors).forEach(
        (key) => errors[key] === null && delete errors[key]
    );

    return {
        errors,
        cleanData
    };
};

module.exports = { validateVolunteer, validateNGO };