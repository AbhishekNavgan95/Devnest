import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (userData) => {
        set({ user: userData, isLoggedIn: true })
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },
    }),
    {
      name: 'devnest-user', // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
)
