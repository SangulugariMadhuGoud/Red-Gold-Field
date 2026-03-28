import api from './client';

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateCartItem: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
};