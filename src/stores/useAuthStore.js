import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,

      setToken: (token) => {
        set({ token: token });
      },

      removeToken: () => {
        set({ token: null });
      },
    }),
    {
      name: "devnest-token", // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);
