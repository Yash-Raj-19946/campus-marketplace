import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(
          "GET /auth/me failed:",
          err.response?.data || err.message
        );
        // ❌ DO NOT auto-logout here
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
