import API from "./api";

// REGISTER
export const registerUser = (data) => API.post("/auth/register", data);

// LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// VERIFY EMAIL
export const verifyEmail = (token) =>
  API.get(`/auth/verify-email/${token}`);

// PROFILE
export const getProfile = () => API.get("/auth/me");

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};
