/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: \reactProject\src\App\auth\index.tsx
 */

import { Navigate, useLocation } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

interface IAuthWrap {
  children: React.ReactNode
}
function AuthWrap(props: IAuthWrap) {
  const location = useLocation()
  const loginStatus = useUserProfileStore((state) => state.isLogin)

  // console.log('@@@@@location', location)
  const { children } = props

  return <>{loginStatus ? children : <Navigate to='/login' />}</>
  // return <>{children}</>
}
export default AuthWrap
