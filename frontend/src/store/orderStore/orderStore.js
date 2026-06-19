import { create } from "zustand";
import {
  createOrderAPI,
  getAllOrdersApi,
  getOrderAPI,
} from "../../services/order/order.api";
import { showSuccess, showError } from "../../utils/toast";

const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  createOrder: async (orderData) => {
    set({ loading: true });
    try {
      const data = await createOrderAPI(orderData);
      // Prepend new order to the top of the list
      set((state) => ({
        orders: [data.order, ...state.orders],
        loading: false,
      }));
      showSuccess(data.message);
      return true; // success — modal close garna
    } catch (error) {
      showError(error.response?.data?.message || "Failed to create order");
      set({ loading: false });
      return false; // failed — modal open nai rakhne
    }
  },
// seller side ko lagi
  getMyOrders: async () => {
    if (get().orders.length > 0) return;
    set({ loading: true });
    try {
      const data = await getOrderAPI();
      set({ orders: data.orders, loading: false });
    } catch (error) {
      showError(error.response?.data?.message || "Failed to fetch orders");
      set({ loading: false });
    }
  },

  getAllOrders: async () => {
    set({ loading: true });
    try {
      const data = await getAllOrdersApi();
      set({ orders: data.orders, loading: false });
    } catch (error) {
      showError(error.response?.data?.message || "Failed to fetch orders");
      set({ loading: false });
      
    }
  },
}));

export default useOrderStore;
