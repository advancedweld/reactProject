/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-07-01 18:17:49
 * @FilePath: \webpackProject\src\App\Dashboard\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { routes } from 'routes'
import { Button, Space } from 'antd'

import useUserProfileStore from 'store/userProfile'
import XMenu from './XMenu'
import ButtonLink from './ButtonLink'
import LinkArea from './LinkArea'

import styles from './style.module.css'

function Dashboard() {
  const location = useLocation()
  const nav = useNavigate()
  const refreshCount = useRef(0)
  useEffect(() => {
    console.log('@@@fresh is -----', refreshCount.current)
    refreshCount.current += 1
    if (refreshCount.current === 1000) {
      refreshCount.current = 0
    }
  })

  const ele = useRoutes(routes)
  console.log('🚀 ~ file: index.tsx:32 ~ Dashboard ~ ele:', ele)

  const logout = useUserProfileStore((state) => state.logout)

  return (
    <div className='Dashboard'>
      <div className={styles.header}>
        <Space>
          <h3
            onClick={() => nav('/')}
            style={{
              cursor: 'pointer',
            }}>
            登录
          </h3>
          <Button onClick={logout}>退出</Button>
        </Space>
      </div>

      {/* 标签和按钮跳转 */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <LinkArea />
        <ButtonLink />
      </div> */}

      <div className={styles.wrap}>
        <XMenu></XMenu>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
