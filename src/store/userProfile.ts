import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isLogin: boolean
  userName: string | null
  login: () => void
  logout: () => void
  changeUserName: (userName: string) => void
}
const useUserProfileStore = create<State, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      isLogin: false,
      userName: 'xiangshangzhi',
      changeUserName: (userName: string) => set((state: State) => ({ ...state, userName })),
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
