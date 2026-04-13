import { apiRequest } from "../services/api";
// Login
export const loginUser = (form) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(form)
  });
};