/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-12-08 20:37:21
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message } from 'antd'

import { useLocation, Link, useNavigate } from 'react-router-dom'
import { LOGIN, APP, GROUP, ABOUT, HOOKS } from 'routes/constant'

import useUserProfileStore from 'store/userProfile'

import style from './style.module.css'

function Login() {
  const location = useLocation()
  const loginStatus = useUserProfileStore((state) => state.isLogin)
  const login = useUserProfileStore((state) => state.login)
  const logout = useUserProfileStore((state) => state.logout)

  const nav = useNavigate()
  // console.log('@@@login is -----', loginStatus)
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })

  const goDashboard = () => {
    if (loginStatus) {
      nav(APP)
    } else {
      message.error('请先登录')
    }
  }
  return (
    <>
      <div className={style.wrap}>
        {loginStatus ? (
          <>
            <span>已登陆</span> <Button onClick={logout}>退出</Button>
          </>
        ) : (
          <>
            <span>请登陆</span>
            <Button onClick={login}>登录</Button>
          </>
        )}
        <h1> login </h1>
        <Button type='text' onClick={goDashboard}>
          首页
        </Button>
      </div>

      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
