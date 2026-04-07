// Central place for all API calls

// Base URL 
const API_URL = "/api";


// GET requests

export async function getUsers(){
  const response = await fetch(`${API_URL}/users`);
  return response.json();
} 

export const createUser = async (user) => {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};

export async function getRoles(){
  const response = await fetch(`${API_URL}/users/roles`);
  return response.json();
} 

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