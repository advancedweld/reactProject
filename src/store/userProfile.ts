import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserProfileStore = create(
  persist(
    (set) => ({
      isLogin: false,
      login: () => set((state: any) => ({ isLogin: true })),
      logout: () => set((state: any) => ({ isLogin: false })),
    }),
    {
      name: 'userProfile-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useUserProfileStore
