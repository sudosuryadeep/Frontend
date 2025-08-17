import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);



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
      setUser(null); // ❌ null = guest
      setToken(null);
    }
  } else {
    // New user or guest
    setUser(null); // ❌ user null = guest
    setToken(null);
  }

  setLoading(false);
}, []);


  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

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

  // get random profile pic for new users
  // Function to get a random anime avatar URL
  const getRandomAnimeAvatar = () => {
    // Use a random string as seed so each user gets unique avatar
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
        register,
        logout,
        setUser, // ✅ expose setUser for local updates (avatar, username, email)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
