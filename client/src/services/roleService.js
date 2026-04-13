import { apiRequest } from "./api";


export const getRoles = () => apiRequest("/users/roles");
