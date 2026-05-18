import apiClient from "../api/apiClient";

export const createProductAPI = async (productData) => {
  const response = await apiClient.post("/product/create", productData);

  return response.data;
};

// individual seller ko products
export const getMyProductAPI = async () => {
  const response = await apiClient.get("/product/my-products");
  return response.data;
};

// delete product

export const deleteProductAPI = async (productId) => {
  const response = await apiClient.delete(`/product/delete/${productId}`);
  return response.data;
};
