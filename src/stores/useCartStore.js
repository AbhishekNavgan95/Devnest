import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (course) => {
        set((state) => ({
            cart: [...(state.cart || []), course],
        }));
      },

      removeFromCart: (courseId) => {
        set((state) => ({
            cart: state.cart.filter((course) => course._id !== courseId),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "devnest-cart", // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);
