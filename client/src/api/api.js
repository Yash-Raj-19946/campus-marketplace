import axios from "axios";

const API = axios.create({
  baseURL: "https://YOUR-BACKEND.onrender.com/api", // 🔥 MUST end with /api
  withCredentials: true,
});

export default API;
