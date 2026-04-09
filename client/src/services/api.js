// Central place for all API calls

// Base URL 
const API_URL = "/api";


// Login
export async function loginUser(form) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    // handle errors
    console.error("API Login failed:", error);
    throw error;
  }
  return response.json();
};


// GET requests

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function getRoles() {
  try {
    const response = await fetch(`${API_URL}/users/roles`);
    // Convert response to JSON
    const data = await response.json();
    return data;

  } catch (error) {
    // handle errors
    console.error("API Error:", error);
    throw error;
  }
}

export const createUser = async (user) => {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

  } catch (error) {
    // handle errors
    console.error("API Error update user:", error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};

export async function getTestMessage() {
  try {
    // Call backend endpoint
    const response = await fetch(`${API_URL}/test`);

    // Convert response to JSON
    const data = await response.json();

    return data;
  } catch (error) {
    // handle errors
    console.error("API Error:", error);
    throw error;
  }
}