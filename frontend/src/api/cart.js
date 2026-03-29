import api from "./client";

export const cartAPI = {
  getCart: () => api.get("/user/cart"),
  addToCart: (productId, quantity) =>
    api.post("/user/cart", { productId, quantity }),
  updateCartItem: (id, quantity) => api.put(`/user/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/user/cart/${id}`),
};
