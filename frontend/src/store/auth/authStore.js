import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data) => {
        set({ user: data.user, token: data.token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // localStorage ma yo naam le save huncha
    },
  ),
);

export default useAuthStore;
