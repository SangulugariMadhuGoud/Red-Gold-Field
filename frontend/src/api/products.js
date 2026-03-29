import api from "./client";

export const productsAPI = {
  getAll: () => api.get("/public/products"),
  getById: (id) => api.get(`/public/products/${id}`),
};
