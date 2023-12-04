import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isLogin: boolean
  login: () => void
  logout: () => void
}
const useUserProfileStore = create<State, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      isLogin: false,
      login: () => set((state: State) => ({ isLogin: true })),
      logout: () => set((state: State) => ({ isLogin: false })),
    }),
    {
      name: 'userProfile-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useUserProfileStore
