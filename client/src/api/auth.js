import api from "./axios";

// REGISTER
export const registerUser = (data) =>
  api.post("/auth/register", data);

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// VERIFY EMAIL
export const verifyEmail = (token) =>
  api.get(`/auth/verify-email/${token}`);

// ✅ REQUIRED BY AuthContext
export const getProfile = () =>
  api.get("/auth/me");

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};
