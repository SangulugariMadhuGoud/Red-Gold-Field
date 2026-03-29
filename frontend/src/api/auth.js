import api from "./client";

export const authAPI = {
  login: (data) => api.post("/auth/login", data),

  register: (data) => api.post("/auth/register", data),

  getCurrentUser: () => api.get("/auth/me"),

  refreshToken: () => api.get("/auth/refresh"),

  logout: () => api.post("/auth/logout"),

  sendOtp: (phone) => api.post("/auth/send-otp", { phone }),

  verifyOtp: (phone, otp) =>
    api.post("/auth/verify-otp", { phone, otp }),
};