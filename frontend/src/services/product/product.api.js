import apiClient from "../api/apiClient";

export const createProductAPI = async (productData) => {
  const response = await apiClient.post("/product/create", productData);

  return response.data;
};
// get all products -- --(for admin)
export const getAllProductsApi = async () => {
  const response = await apiClient.get("/product/all");
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

// admin le product ko status control garxa(accept, reject)

export const updateProductStatusAPI = async (productId, status) => {
  const response = await apiClient.put(`/admin/products/${productId}/status`, {
    status,
  });

  return response.data;
};
