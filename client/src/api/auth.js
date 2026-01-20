import API from "./api";

/* ================= AUTH ================= */

// REGISTER
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  // save token if backend returns it
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};

// VERIFY EMAIL
export const verifyEmail = (token) => {
  return API.get(`/auth/verify-email/${token}`);
};

// PROFILE
export const getProfile = () => {
  return API.get("/auth/me");
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};
