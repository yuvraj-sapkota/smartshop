import apiClient from "../api/apiClient";

export const createOrderAPI = async (orderData) => {
  const response = await apiClient.post("/orders/create", orderData);
  return response.data;
};

export const getOrderAPI = async () => {
  const response = await apiClient.get("/orders/my-orders");
  return response.data;
};

export const getAllOrdersApi = async () => {
  const response = await apiClient.get("/orders/all-orders");
  console.log(response);
  return response.data;
};
