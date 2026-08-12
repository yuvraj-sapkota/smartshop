import { create } from "zustand";
import { getCustomersAPI } from "../../services/customer/customer.api";
import { showError } from "../../utils/toast";

const useCustomerStore = create((set, get) => ({
  customers: [],
  loading: false,

  getCustomers: async () => {

    set({ loading: true });
    try {
      const data = await getCustomersAPI();
      set({ customers: data.customers, loading: false });
    } catch (error) {
      showError(error.response?.data?.message || "Failed to fetch customers");
      set({ loading: false });
    }
  },
}));

export default useCustomerStore;
