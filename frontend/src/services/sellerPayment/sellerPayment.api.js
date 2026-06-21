import apiClient from "../api/apiClient";

// seller le admin lai paisa tirni
export const submitPaymentAPI = async (formData) => {
  const response = await apiClient.post("/seller-payments/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// admin side ko lagi
export const getAllSubmitPaymentAPI = async () => {
  const response = await apiClient.get("/seller-payments/all");
  return response.data;
};

// admin le status approved/reject garna
export const updatePaymentStatus = async (id, newStatus) => {
  const response = await apiClient.patch(`/seller-payments/${id}/status`, {
    status: newStatus,
  });
  return response.data;
};

// seller side ko lagi (seller ko payment history)
export const getMyPayments = async () => {
  const response = await apiClient.get("/seller-payments/my-payments");
  return response.data;
};

export const getDueAmount = async () => {
  const response = await apiClient.get("/seller-payments/due-amount");
  return response.data;
};
