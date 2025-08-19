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
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🧊 Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* 🧾 Login Box */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-6 w-full max-w-md space-y-5 overflow-hidden">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>
            <p className="text-sm text-gray-500">Login to continue</p>
          </div>

          {/* Demo Accounts */}
          <div className="bg-gray-50 border rounded-md p-2">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex justify-between items-center text-sm font-semibold text-gray-700"
            >
              Demo Accounts
              {showDemo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showDemo && (
              <div className="mt-2 space-y-2 text-sm">
                <div
                  className="cursor-pointer p-2 border rounded-md bg-white hover:bg-indigo-50"
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
                  className="cursor-pointer p-2 border rounded-md bg-white hover:bg-indigo-50"
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

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center bg-red-100 py-2 rounded text-sm">
              {error}
            </p>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <hr className="flex-grow border-gray-300" /> OR{" "}
            <hr className="flex-grow border-gray-300" />
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
    </div>
  );
};

export default Login;
