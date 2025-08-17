import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom"; // Hook for navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic Email Validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setMessage("Please enter a valid email address.");
    return;
  }

  try {
    // Call forgot password API
    const res = await forgotPassword(email);
    // Show appropriate message based on the response
    setMessage(
      res.message || "If the account exists, a reset link has been sent."
    );
  } catch (err) {
    // Handle error message from API
    setMessage(err.message || "Error sending reset link.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="mt-3 text-gray-700">{message}</p>}

        <div className="mt-4 text-center">
          {/* Button to navigate to Login */}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 mb-2 block"
          >
            Remembered? Go to Login
          </button>

          {/* Button to navigate to Register */}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
