// Base URL 
const API_URL = "/api";

// Create a central API helper
export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    // ...options  spread operator : Take all properties from options.headers and add them here
    const headers = {
        "Content-Type": "application/json",

        ...options.headers
    };

    if (token) {
         headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "API error");
    }

    return data;
};

export const apiRequestForBlob = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "File download failed");
    }

    return await response.blob();
    
};

export const apiWithFileRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    // ...options  spread operator : Take all properties from options.headers and add them here
    const headers = {
        ...options.headers
    };

    if (token) {
         headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "API error");
    }

    return data;
};
