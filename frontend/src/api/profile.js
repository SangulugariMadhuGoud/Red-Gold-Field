import api from './client';

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getAddresses: () => api.get('/profile/addresses'),
  addAddress: (address) => api.post('/profile/addresses', address),
  updateAddress: (id, address) => api.put(`/profile/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/profile/addresses/${id}`),
};