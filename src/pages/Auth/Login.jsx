import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showUserPass, setShowUserPass] = useState(false);
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

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
        if (res.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        setError(res.message || "Login failed.");
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
      const user = await loginWithGoogle(response.credential);
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google login failed on server.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-black/60 to-indigo-700/70"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          Welcome Back 👋
        </h1>
        <p className="text-gray-200 text-sm mb-6">Login to continue</p>

        {/* Demo Accounts */}
        <div className="bg-white/10 border border-white/20 rounded-lg mb-4">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="w-full flex justify-between items-center px-4 py-2 text-white font-medium"
          >
            Demo Accounts
            {showDemo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showDemo && (
            <div className="p-3 space-y-3 text-left text-sm text-gray-100">
              <div
                className="cursor-pointer p-3 rounded-md bg-white/10 hover:bg-white/20 transition"
                onClick={() => {
                  setEmail("joinnow.inc@gmail.com");
                  setPassword("PrimeOro");
                }}
              >
                <p className="font-semibold">User</p>
                <p>Email: joinnow.inc@gmail.com</p>
                <p className="flex items-center gap-2">
                  Pass: {showUserPass ? "PrimeOro" : "••••••••"}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserPass(!showUserPass);
                    }}
                  >
                    {showUserPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </p>
              </div>
              <div
                className="cursor-pointer p-3 rounded-md bg-white/10 hover:bg-white/20 transition"
                onClick={() => {
                  setEmail("learnonix@gmail.com");
                  setPassword("learnonix");
                }}
              >
                <p className="font-semibold">Admin</p>
                <p>Email: learnonix@gmail.com</p>
                <p className="flex items-center gap-2">
                  Pass: {showAdminPass ? "learnonix" : "••••••••"}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAdminPass(!showAdminPass);
                    }}
                  >
                    {showAdminPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 py-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-300 text-xs my-4">
          <hr className="flex-grow border-gray-500/30" /> OR{" "}
          <hr className="flex-grow border-gray-500/30" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login failed")}
            size="medium"
            theme="outline"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
