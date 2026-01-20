import axios from "axios";

/**
 * ⚠️ HARD SET BACKEND URL
 * Do NOT use placeholders
 * Do NOT use window logic for now
 */
const API = axios.create({
  baseURL: "https://ACTUAL-BACKEND-NAME.onrender.com/api",
  withCredentials: true,
});

/* ================= INTERCEPTOR ================= */
API.interceptors.request.use(
  (req) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // prevents crash in edge cases
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
