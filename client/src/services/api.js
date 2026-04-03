// Central place for all API calls

// Base URL 
const API_URL = "/api";

// GET request
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