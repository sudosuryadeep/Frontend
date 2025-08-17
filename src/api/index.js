// src/api/index.js
export const BASE_URL = "https://learnonix.onrender.com/api";

export function getAuthHeader(token) {
    return { Authorization: `Bearer ${token}` };
}
