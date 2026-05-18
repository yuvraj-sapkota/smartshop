// src/store/productStore.js
import { create } from "zustand";
import {
  createProductAPI,
  deleteProductAPI,
  getMyProductAPI,
} from "../../services/product/product.api";
import { showSuccess, showError } from "../../utils/toast";

const useProductStore = create((set, get) => ({
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
      showError(error.response?.data?.message || "Something went wrong");
      set({
        loading: false,
      });
    }
  },

  // individual seller ko products
  getMyProducts: async () => {
    if (get().products.length > 0) return;

    set({ loading: true, error: null });
    try {
      const data = await getMyProductAPI();
      set({
        products: data.products,
        loading: false,
      });
    } catch (error) {
      showError(error.response?.data?.message || "something went wrong");
      loading: false;
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null });

    try {
      const data = await deleteProductAPI(productId);

      // frontend state update (remove deleted product)
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
      }));

      showSuccess(data.message);
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong");
      set({ loading: false });
    }
  },
}));

export default useProductStore;
