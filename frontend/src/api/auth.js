import api from "./axios";

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const loginUser = (data) => {
  return api.post("/login", data);
};
export const forgotPassword = (email) => {
  return api.post("/forgot-password", { email });
};

export const resetPassword = (data) => {
  return api.post("/reset-password", data);
};
