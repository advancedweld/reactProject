/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\header\index.tsx
 */

import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

import { Button, Space } from 'antd'

import styles from './style.module.css'

const Entry = () => {
  const nav = useNavigate()

  const refreshCountRef = React.useRef(0)

  useEffect(() => {
    refreshCountRef.current += 1
    console.log('@@@@ header刷新')
  })
  const { userName, logout, changeUserName } = useUserProfileStore((state) => state)
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
          <Button onClick={() => changeUserName(`xiangshangzhi${Date.now()}`)}>修改用户名</Button>
          <div>当前用户：{userName}</div>
          <div>刷新次数：{refreshCountRef.current}</div>
          <div>
            zustand里全局状态变更，只会影响订阅到该状态的组件。也就是zustand全局状态变更，<b>不会导致整个应用重新渲染</b>
          </div>
        </Space>
      </div>
    </div>
  )
}

export default Entry
