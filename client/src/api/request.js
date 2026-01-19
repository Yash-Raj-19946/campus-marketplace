import API from "./auth";

/**
 * BUY REQUEST
 */
export const requestBuy = (productId) => {
  return API.post(`/requests/${productId}`, {});
};

/**
 * RENT REQUEST (🔥 BODY WAS MISSING BEFORE)
 */
export const requestRent = (productId, data) => {
  return API.post(`/requests/${productId}`, data);
};

/**
 * SELLER GET REQUESTS
 */
export const getSellerRequests = () => {
  return API.get("/requests/seller");
};

/**
 * SELLER CONFIRM
 */
export const confirmRequest = (requestId) => {
  return API.patch(`/requests/${requestId}/confirm`);
};

/**
 * SELLER CANCEL
 */
export const sellerCancelRequest = (requestId) => {
  return API.patch(`/requests/${requestId}/seller-cancel`);
};

/**
 * BUYER CANCEL
 */
export const buyerCancelRequest = (requestId) => {
  return API.patch(`/requests/${requestId}/cancel`);
};
export const getMyHistory = () => {
  return API.get("/requests/my-history");
};

