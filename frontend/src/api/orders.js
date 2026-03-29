import api from "./client";

export const ordersAPI = {
  getOrders: () => api.get("/user/orders"),
  createOrder: (shippingAddress, paymentMethod) =>
    api.post("/user/orders", { shippingAddress, paymentMethod }),
  getOrder: (id) => api.get(`/user/orders/${id}`),
};
