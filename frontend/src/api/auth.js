import api from './client';

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, fullName, phone) =>
    api.post('/auth/register', { email, password, fullName, phone }),
  getCurrentUser: () => api.get('/auth/me'),
};