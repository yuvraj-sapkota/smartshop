import apiClient from "../api/apiClient";

export const getCustomersAPI = async () => {
  const response = await apiClient.get("/users/customers");
  return response.data;
};

export const getAllUsersAPI = async () => {
  const response = await apiClient.get("/users/all-users");
  return response.data;
};
