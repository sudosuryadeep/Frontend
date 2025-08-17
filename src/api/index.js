// src/api/index.js
export const BASE_URL = "http://localhost:4000/api";

export function getAuthHeader(token) {
    return { Authorization: `Bearer ${token}` };
}
