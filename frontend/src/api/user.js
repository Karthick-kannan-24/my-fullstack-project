import api from "./axios";

export const getUsers = () => {
  return api.get("/users");
};

export const createUser = (data) => {
  return api.post("/users", data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};