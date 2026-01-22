import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/auth";

/**
 * 🔥 IMPORTANT
 * - Named export ONLY
 * - NO default export
 */
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user if token exists
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
      .catch(() => {
        // Token invalid or expired
        logoutUser();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
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
