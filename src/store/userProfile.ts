import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserProfile = {
  userName: string
  // password: string
  email?: string
  avatar?: string
}

type State = {
  isLogin: boolean
  userProfile: UserProfile | null
  login: () => void
  logout: () => void
  updateUserProfile: (profile: UserProfile) => void
}
const useUserProfileStore = create<State, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      isLogin: false,
      userProfile: null,
      updateUserProfile: (userProfile: UserProfile) => set((state: State) => ({ ...state, userProfile })),
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
