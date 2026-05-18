// src/store/productStore.js
import { create } from "zustand";
import { createProductAPI } from "../../services/product/product.api";
import { showSuccess, showError } from "../../utils/toast";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const data = await createProductAPI(productData);
      set((state) => ({
        products: [...state.products, data.product],
        loading: false,
      }));
      showSuccess(data.message);
      
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default useProductStore;
