/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: \reactProject\src\App\auth\index.tsx
 */

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

interface IAuthWrap {
  children: React.ReactNode
}

function AuthWrap(props: IAuthWrap) {
  const { children } = props
  const location = useLocation()
  const navigate = useNavigate()
  const loginStatus = useUserProfileStore((state) => state.isLogin)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 开发环境下的行为
      if (location.pathname === '/') {
        navigate('/home')
      }
    } else {
      // 生产环境下的行为
      if (!loginStatus) {
        navigate('/login')
      }
      if (location.pathname === '/') {
        navigate('/home')
      }
    }
  }, [location.pathname, loginStatus, navigate])

  return <>{children}</>
}

export default AuthWrap
