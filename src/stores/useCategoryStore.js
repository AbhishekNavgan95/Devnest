import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategoryStore = create(
  persist(
    (set) => ({
      categories: null,

      setCategories: (categories) => {
        set({ categories: categories });
      },
    }),
    {
      name: "devnest-categories", // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);
