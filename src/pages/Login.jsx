import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth(); // loginWithGoogle must be implemented in AuthContext

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      const res = await login(email, password);
      if (res.success) {
        // Redirect based on role
        if (res.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        setError(res.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again later.");
    }
  };

  const handleGoogleLogin = async (response) => {
    if (!response.credential) {
      setError("Google login failed. Please try again.");
      return;
    }

    try {
      // Send Google token to backend
      const user = await loginWithGoogle(response.credential); // implement this in AuthContext
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google login failed on server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <div className="text-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login failed. Please try again.")}
            useOneTap
            shape="pill"
            theme="outline"
            width="wide"
            size="large"
          />
        </div>

        {/* Navigation Links */}
        <div className="mt-4 text-center space-y-2">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 block w-full"
          >
            New User? Register
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-blue-500 block w-full"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
