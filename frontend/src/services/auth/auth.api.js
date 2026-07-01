import apiClient from "../api/apiClient";

export const registerUserApi = async (data) => {
  const response = await apiClient.post("/auth/register-user", data);
  return response.data;
};
export const registerSellerApi = async (data) => {
  const response = await apiClient.post("/auth/register-seller", data);

  return response.data;
};

export const loginApi = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
