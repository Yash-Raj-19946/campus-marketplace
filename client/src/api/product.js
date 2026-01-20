import API from "./api";


// POST PRODUCT WITH IMAGE
export const postProduct = (formData) => {
  return API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET ALL BUY PRODUCTS
export const getBuyProducts = (query = "") => {
  return API.get(`/products/buy?search=${query}`);
};

// GET ALL RENT PRODUCTS
export const getRentProducts = (query = "") => {
  return API.get(`/products/rent?search=${query}`);
};

// GET SINGLE PRODUCT
export const getProductById = (id) => {
  return API.get(`/products/${id}`);
};

// RENT REQUEST
export const requestRent = (id, data) => {
  return API.post(`/products/rent/${id}`, data);
};

// TAKE DOWN PRODUCT
export const takeDownProduct = (id) => {
  return API.patch(`/products/${id}/take-down`);
};

// USER DASHBOARD PRODUCTS
export const getMyProducts = () => {
  return API.get("/products/my");
};
