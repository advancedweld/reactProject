/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: \reactProject\src\App\auth\index.tsx
 */

import { Navigate, redirect, useLocation } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

interface IAuthWrap {
  children: React.ReactNode
}
function AuthWrap(props: IAuthWrap) {
  const location = useLocation()
  const loginStatus = useUserProfileStore((state) => state.isLogin)

  console.log('@@@@@@process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('@@@@@location', location)
  const { children } = props

  // 开发环境直接定位到首页
  if (process.env.NODE_ENV === 'development') {
    if (location.pathname === '/') return <Navigate to='/home' />
    return <>{children}</>
  } else {
    if (!loginStatus) {
      return <Navigate to='/login' />
    }
    if (location.pathname === '/') return <Navigate to='/home' />
    return <>{children}</>
  }
}
export default AuthWrap
