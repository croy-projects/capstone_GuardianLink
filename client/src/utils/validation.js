// validation.js
import { ROLES } from "../config/roles";
export const validateName = (name) => {
    if (!name || name.trim() === "") return "Name is required";

    if (name.length > 255) {
        return "Name too long";
    }

    return null;
};

export const validateEmail = (email) => {
    if (!email) return "Email is required";

    if (email.length > 255) {
        return "Email too long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    return null;
};

export const validatePassword = (password) => {
    if (!password) return "Password is required";

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    if (password.length > 100) {
        return "Password is too long";
    }

    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]+$/;
    if (!passwordRegex.test(password)) {
        return "Password contains invalid characters. Only letters, numbers, and special characters  ! @ # $ % ^ & * are allowed.";
    }

    return null;
};

export const validate = (data, type) => {
    const isVolunteer = Number(data.role_id) === ROLES.VOLUNTEER;
    const isNGO = Number(data.role_id) === ROLES.NGO;
    const isNew = (type === 'new');

    //if (!data.name || !data.email || (isNew && !data.password) || !data.role_id) {
    if (!data.name || !data.email || (isNew && !data.password)){
        return "Please fill in all required fields";
    }

    const nameError = validateName(data.name);
    if (nameError) return nameError;

    const emailError = validateEmail(data.email);
    if (emailError) return emailError;

    if (isNew) {
        const passwordError = validatePassword(data.password);

        if (passwordError) return passwordError;

        if (data.password !== data.confirmPassword) {
            return "Passwords do not match";
        }
    }

    if (isVolunteer && !data.hours_by_week) {
        return "Hours are required for volunteers";
    }

    if (isNGO && (!data.area_of_concern || data.area_of_concern.trim() === "")) {
        return "Areas of concern is required for organizations";
    }
    if (isNGO && data.area_of_concern.length > 5000) {
        return "Area of Concern : text is too long";
    }

    return null;
};
