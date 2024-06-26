/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\header\index.tsx
 */

import React, { Suspense, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserProfileStore from 'store/userProfile'

import { Button, Space, Tooltip } from 'antd'

import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from './style.module.css'

const Entry = () => {
  const nav = useNavigate()

  const [count, Setcount] = React.useState(0)

  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const [timeStr, SetTimeStr] = useState(new Date().toLocaleString())
  const refreshCountRef = React.useRef(0)

  const divRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      SetTimeStr(new Date().toLocaleString())
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // useeffect 执行时机，会在组件渲染完后执行
  useEffect(() => {
    // blue  而不是 red  显示的是第一次渲染时候的颜色，在执行完count+1后会变成red
    console.log('header渲染div', divRef.current?.style.color)
    Setcount(count + 1)
  }, [])
  useEffect(() => {
    refreshCountRef.current += 1
    // console.log('@@@@ header刷新', count)
  })
  const { userProfile, logout, updateUserProfile } = useUserProfileStore((state) => state)

  const userLogout = () => {
    localStorage.removeItem('access_token')
    logout()
    nav('/login')
  }
  return (
    <div className={styles.wrap}>
      <Space>
        <div>刷新次数{refreshCountRef.current}</div>
        <Tooltip
          title={
            <div>
              zustand里全局状态变更，只会影响订阅到该状态的组件。也就是zustand全局状态变更，<b>不会导致整个应用重新渲染</b>
            </div>
          }>
          <QuestionCircleOutlined />
        </Tooltip>

        <div ref={divRef} style={{ color: count ? 'red' : 'blue' }}>{`count:${count}`}</div>
      </Space>
      <Space>
        <div>{`当前时间：${timeStr}`}</div>
        <Button
          onClick={() =>
            updateUserProfile({
              ...userProfile,
              userName: `xiang${Date.now().toString().slice(-5)}`,
            })
          }>
          修改用户名
        </Button>
        <div>当前用户：{userProfile?.userName}</div>
        <Button onClick={userLogout}>注销</Button>
        <Link to='/user-manage'>用户管理</Link>
      </Space>
    </div>
  )
}

export default Entry
