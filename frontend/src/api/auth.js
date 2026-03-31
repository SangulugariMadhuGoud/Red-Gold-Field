import api from "./client";

export const authAPI = {
  login: (data) => api.post("/public/auth/login", data),

  register: (data) => api.post("/public/auth/register", data),

  getCurrentUser: () => api.get("/public/auth/me"),

  refresh: () => api.post("/public/auth/refresh"),

  logout: () => api.post("/public/auth/logout"),

  sendOtp: (phone) => api.post("/public/auth/send-otp", { phone }),

  verifyOtp: (phone, otp) =>
    api.post("/public/auth/verify-otp", { phone, otp }),

  forgotPassword: (email) =>
    api.post("/public/auth/forgot-password", { email }),

  verifyResetOtp: (email, otp) =>
    api.post("/public/auth/verify-reset-otp", { email, otp }),

  resetPassword: (newPassword) =>
    api.post("/public/auth/reset-password", { newPassword }),

  googleLogin: () =>
    (window.location.href = "http://localhost:5000/api/public/auth/google"),
};
