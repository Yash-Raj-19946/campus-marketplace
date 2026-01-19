import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => {
        // 🔥 FIX: backend returns user directly
        setUser(res.data);
      })
      .catch(() => {
        logoutUser();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
  logoutUser();
  setUser(null);
  window.location.href = "/"; // 🔥 force navigation
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
