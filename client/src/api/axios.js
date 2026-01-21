import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-marketplace-api.onrender.com",
  withCredentials: true,
});

export default api;
