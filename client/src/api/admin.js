import API from "./auth";

// GET ADMIN DASHBOARD STATS
export const getAdminStats = () => {
  return API.get("/admin/stats");
};

// GET ALL TRANSACTIONS (commission)
export const getCommissionData = () => {
  return API.get("/admin/commissions");
};

// MARK COMMISSION AS PAID
export const markCommissionPaid = (transactionId) => {
  return API.patch(`/admin/commissions/${transactionId}/paid`);
};

// GET ALL USERS (optional)
export const getAllUsers = () => {
  return API.get("/admin/users");
};
