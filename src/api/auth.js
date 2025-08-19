import { BASE_URL } from "./index.js";

export async function registerUser(username, email, password) {
    if (!username || !email || !password) {
        throw new Error('Username, email, and password are required.');
    }

    email = email.trim();

    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to register');
        }

        return await res.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'An error occurred while trying to register.');
    }
}

export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    email = email.trim();

    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to login');
        }

        return await res.json();
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.message || 'An error occurred while trying to login.');
    }
}

// Forgot Password
export async function forgotPassword(email) {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return res.json();
}

// ✅ Google Login
export async function loginWithGoogleApi(googleToken) {
    if (!googleToken) {
        throw new Error("Google token is required.");
    }

    try {
        const res = await fetch(`${BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: googleToken }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Google login failed");
        }

        return await res.json(); // { user, token }
    } catch (error) {
        console.error("Google login error:", error);
        throw new Error(error.message || "An error occurred while trying to login with Google.");
    }
}
