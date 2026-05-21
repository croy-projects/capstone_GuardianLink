import { apiRequest, apiWithFileRequest } from "../services/api";
// Login
//  arrow function implicit return  
export const loginUser = (form) => 
    apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
    });

export const forgotPassword = (form) =>
    apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(form)
    });

export const resetPassword = (id, password) =>
    apiRequest(`/auth/reset-password/${id}`, {
        method: "PUT",
        body: JSON.stringify({password: password})
    });

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