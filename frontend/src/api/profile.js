import api from "./client";

export const profileAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/profile", data),
  getAddresses: () => api.get("/user/profile/addresses"),
  addAddress: (address) => api.post("/user/profile/addresses", address),
  updateAddress: (id, address) =>
    api.put(`/user/profile/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/user/profile/addresses/${id}`),
};
