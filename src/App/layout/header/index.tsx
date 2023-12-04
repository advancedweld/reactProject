/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\header\index.tsx
 */

import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

import { Button, Space } from 'antd'

import styles from './style.module.css'

const Entry = () => {
  console.log('Entry')
  const nav = useNavigate()
  const login = () => {
    nav('/login')
  }

  const logout = useUserProfileStore((state) => state.logout)
  return (
    <div className={styles.wrap}>
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
    </div>
  )
}

export default Entry
