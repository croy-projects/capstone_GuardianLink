import { apiRequest, apiWithFileRequest } from "../services/api";
// Login
export const loginUser = (form) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
    });
};
export const forgotPassword = (form) => {
    return apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(form)
    });
};
// register NGO
export const registerNGO = (form) =>
    apiRequest("/auth/register-ngo", {
        method: "POST",
        body: JSON.stringify(form)
    });

// register Volunteer
export const registerVolunteer = (form) =>
    // use apiWithFileRequest to handle files 
    apiWithFileRequest("/auth/register-volunteer", {
        method: "POST",
        body: form
    });