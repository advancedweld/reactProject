/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-06-20 14:32:50
 * @FilePath: \reactProject\src\App\Dashboard\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 * errorboundary: https://github.com/bvaughn/react-error-boundary
 *
 */
import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { routes } from 'routes'
import { ErrorBoundary } from 'react-error-boundary'
import useUserProfileStore from 'store/userProfile'
import XMenu from './XMenu'
import ButtonLink from './ButtonLink'
import LinkArea from './LinkArea'

import styles from './style.module.css'

function Dashboard() {
  const refreshCount = useRef(0)
  useEffect(() => {
    console.log('@@@fresh is -----', refreshCount.current)
    refreshCount.current += 1
    if (refreshCount.current === 1000) {
      refreshCount.current = 0
    }
  })

  const ele = useRoutes(routes)

  const refreshCountRef = useRef(0)

  useEffect(() => {
    refreshCountRef.current += 1
  })
  const logout = useUserProfileStore((state) => state.logout)

  function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role='alert'>
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    )
  }
  return (
    <>
      {/* 标签和按钮跳转 */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <LinkArea />
        <ButtonLink />
      </div> */}

      <div className={styles.dashboardWrap}>
        <XMenu></XMenu>
        <div className={styles.content}>
          <div>content刷新次数：{refreshCountRef.current}</div>

          <ErrorBoundary fallbackRender={fallbackRender}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}

export default Dashboard
