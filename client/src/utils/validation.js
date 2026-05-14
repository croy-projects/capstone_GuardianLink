// validation.js

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

