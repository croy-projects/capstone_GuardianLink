import { apiRequest, apiRequestForBlob } from "./api";

// GET requests
export const getUsers = () => apiRequest("/users");

export const getUserById = (id) => apiRequest(`/users/${id}`);

export const getVolunteers = () => apiRequest("/users/volunteers");

export const getVolunteerById = (id) => apiRequest(`/users/volunteers/${id}`);
export const getVolunteerFile = (id, filename) => apiRequestForBlob(`/users/volunteers/${id}/${filename}`);

export const getNGOs = () => apiRequest("/users/ngos");
export const getNGOById = (id) => apiRequest(`/users/ngos/${id}`);

export const getProfile = () => apiRequest("/users/profile");

// POST + PUT
export const createUser = (user) =>
  apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(user)
  });

export const updateUser = (id, user) =>
  apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user)
  });

export const deleteUser = (id) =>
  apiRequest(`/users/${id}`, {
    method: "DELETE"
  });

export const updateNGO = (id, data) =>
  apiRequest(`/users/ngos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const updateVolunteer = (id, data) =>
  apiRequest(`/users/volunteers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });