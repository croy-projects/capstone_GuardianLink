import { apiRequest } from "./api";

// GET requests
export const getUsers = () => apiRequest("/users");

export const getUserById = (id) => apiRequest(`/users/${id}`);

export const getVolunteers = () => apiRequest("/users/volunteers");

export const getVolunteerById = (id) => apiRequest(`/users/volunteers/${id}`);

export const getNGOs = () => apiRequest("/users/ngos");
export const getNGOById = (id) => apiRequest(`/users/ngo/${id}`);

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