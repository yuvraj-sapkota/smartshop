import apiClient from "../api/apiClient";

export const createOrderAPI = async (payload) => {
  const response = await apiClient.post("/orders/create", payload);
  return response.data;
};

export const getOrderAPI = async () => {
  const response = await apiClient.get("/orders/my-orders");
  return response;
};
