import apiClient from "../api/apiClient";

export const createOrderAPI = async (orderData) => {
  const response = await apiClient.post("/orders/create", orderData);
  return response.data;
};

// seller side ko lagi
export const getOrderAPI = async () => {
  const response = await apiClient.get("/orders/my-orders");
  return response.data;
};

// all orders admin side ko lagi
export const getAllOrdersApi = async () => {
  const response = await apiClient.get("/orders/all-orders");
  console.log(response);
  return response.data;
};

// user side ko lagi user purchases
export const getMyPurchasesAPI = async () => {
  const response = await apiClient.get("/orders/my-purchases");
  return response.data;
};
