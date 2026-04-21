import { apiRequest, apiWithFileRequest } from "../services/api";
// Login
export const loginUser = (form) => {
  return apiRequest("/auth/login", {
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
  apiWithFileRequest("/auth/register-volunteer", {
    method: "POST",
    body: form
  });