import { create } from 'zustand'

const useUserProfileStore = create((set) => ({
  isLogin: false,
  login: () => set((state: any) => ({ isLogin: true })),
  logout: () => set((state: any) => ({ isLogin: false })),
}))

export default useUserProfileStore
