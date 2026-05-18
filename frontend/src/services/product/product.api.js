import apiClient from "../api/apiClient";

export const createProductAPI = async (productData) => {
  const response = await apiClient.post("/product/create", productData);
  console.log(response);
  return response.data;
};
