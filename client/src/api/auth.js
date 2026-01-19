import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// REGISTER
export const registerUser = (data) => API.post("/auth/register", data);

// LOGIN
export const loginUser = (data) => API.post("/auth/login", data);

// VERIFY EMAIL
export const verifyEmail = (token) =>
  API.get(`/auth/verify-email/${token}`);

// PROFILE
export const getProfile = () => API.get("/auth/me");

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default API;
