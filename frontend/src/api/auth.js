import api from "./client";

export const authAPI = {
  login: (data) => api.post("/public/auth/login", data),

  register: (data) => api.post("/public/auth/register", data),

  getCurrentUser: () => api.get("/public/auth/me"),

  refreshToken: () => api.get("/public/auth/refresh"),

  logout: () => api.post("/public/auth/logout"),

  sendOtp: (phone) => api.post("/public/auth/send-otp", { phone }),

  verifyOtp: (phone, otp) =>
    api.post("/public/auth/verify-otp", { phone, otp }),
};
