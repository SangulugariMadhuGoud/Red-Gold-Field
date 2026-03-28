import api from "./client";

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (email, password, fullName, phone) =>
    api.post("/auth/register", { email, password, fullName, phone }),
  getCurrentUser: () => api.get("/auth/me"),
  refreshToken: (refreshToken) => api.post("/auth/refresh", { refreshToken }),
  sendOTP: (phone) => api.post("/auth/send-otp", { phone }),
  verifyOTP: (phone, otp) => api.post("/auth/verify-otp", { phone, otp }),
};
