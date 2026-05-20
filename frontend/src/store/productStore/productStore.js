// src/store/productStore.js
import { create } from "zustand";
import {
  createProductAPI,
  deleteProductAPI,
  getAllProductsApi,
  getMyProductAPI,
  updateProductStatusAPI,
} from "../../services/product/product.api";
import { showSuccess, showError } from "../../utils/toast";

const useProductStore = create((set, get) => ({
  products: [],
  allProducts: [], //sabbai seller ko products aako cha
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

  // get all products -- -- admin
  getAllProducts: async () => {
    if (get().allProducts.length > 0) return;

    set({ loading: true, error: null });
    try {
      const data = await getAllProductsApi();
      set({ allProducts: data.products, loading: false });
    } catch (error) {
      showError(error.response?.data?.message || "something went wrong");
      set({ loading: false });
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

  updateProductStatus: async (productId, status) => {
    try {
      const data = await updateProductStatusAPI(productId, status);
      set((state) => ({
        allProducts: state.allProducts.map((p) =>
          p._id === productId ? { ...p, status } : p,
        ),
      }));

      showSuccess(data.message);
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong");
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
