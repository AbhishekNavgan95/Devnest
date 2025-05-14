import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTopicsStore = create(
  persist(
    (set) => ({
      topics: [],

      setTopics: (topics) => {
        set({ topics: topics });
      },
    }),
    {
      name: "devnest-topics", // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);
