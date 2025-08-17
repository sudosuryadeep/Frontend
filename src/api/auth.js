import { BASE_URL } from "./index.js";

export async function registerUser(username, email, password) {
    // Basic Input Validation
    if (!username || !email || !password) {
        throw new Error('Username, email, and password are required.');
    }

    // Trim any leading/trailing spaces from the email
    email = email.trim();

    try {
        // Make the POST request to register endpoint
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        // Check if the response is successful (status code 200-299)
        if (!res.ok) {
            // If not, handle the error and return a message from the response
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to register');
        }

        // Return the response JSON if successful
        return await res.json();
    } catch (error) {
        // Handle network or server errors
        console.error('Registration error:', error);
        throw new Error(error.message || 'An error occurred while trying to register.');
    }
}


export async function loginUser(email, password) {
    // Basic Input Validation
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    // Trim any leading/trailing spaces from the email
    email = email.trim();

    try {
        // Make the POST request to login endpoint
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        // Check if response is okay (status code 200-299)
        if (!res.ok) {
            // If not, handle the error and return a message from the response
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to login');
        }

        // Return the response JSON if successful
        return await res.json();
    } catch (error) {
        // Handle fetch/network errors here
        console.error('Login error:', error);
        throw new Error(error.message || 'An error occurred while trying to login.');
    }
}


// Forgot Password function
export async function forgotPassword(email) {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return res.json();
}
