import api from "./client";

export const productsAPI = {
  getAll: () => api.get("/products"),
  getProduct: (id) => api.get(`/products/${id}`),
};
