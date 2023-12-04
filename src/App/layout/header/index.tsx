/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\header\index.tsx
 */

import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import styles from './style.module.css'

const Entry = () => {
  console.log('Entry')
  const nav = useNavigate()
  const login = () => {
    nav('/login')
  }
  return (
    <div className={styles.wrap}>
      <div>俺是头部</div>
      <Button onClick={login}>登录</Button>
    </div>
  )
}

export default Entry
