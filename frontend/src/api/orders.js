import api from './client';

export const ordersAPI = {
  getOrders: () => api.get('/orders'),
  createOrder: (shippingAddress, paymentMethod) =>
    api.post('/orders', { shippingAddress, paymentMethod }),
  getOrder: (id) => api.get(`/orders/${id}`),
};