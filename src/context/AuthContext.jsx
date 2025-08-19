import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, loginWithGoogleApi } from "../api/auth";
// 👆 backend call for Google login (we’ll define this in api/auth.js)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get saved user & token on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          avatar: parsedUser.avatar || getRandomAnimeAvatar(),
        });
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        setToken(null);
      }
    } else {
      setUser(null);
      setToken(null);
    }

    setLoading(false);
  }, []);

  // Normal email-password login
  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      return { success: true, user: res.user, role: res.user.role };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ✅ Google login
  const loginWithGoogle = async (googleToken) => {
    try {
      const res = await loginWithGoogleApi(googleToken); // backend call
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      return res.user;
    } catch (err) {
      throw new Error(err.message || "Google login failed");
    }
  };

  // Register new user
  const register = async (username, email, password) => {
    try {
      await registerUser(username, email, password);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Random profile pic
  const getRandomAnimeAvatar = () => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/150?img=${randomId}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        loginWithGoogle, // ✅ expose this to Login.jsx
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
