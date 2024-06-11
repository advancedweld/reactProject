/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-06-10 17:19:13
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'

import { Link, useNavigate } from 'react-router-dom'
import { APP, APPHOME } from 'routes/constant'
import useUserProfileStore from 'store/userProfile'

import { userLogin, userRegister } from './service/api'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import loginBg from '@/assets/images/login_bg.jpg'
import style from './style.module.css'

function Login() {
  const [type, setType] = React.useState<'login' | 'register'>('login')
  const { userProfile, logout, updateUserProfile, login } = useUserProfileStore((state) => state)

  const [form] = Form.useForm<any>()

  const nav = useNavigate()

  // 用户登录请求
  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (response) => {
      console.log('@@@@@@@@userLoginMutation', response)
      updateUserProfile(response.data)
      login()
      nav(APPHOME)
      message.success('登录成功')
    },
    onError: (error) => {
      console.log('@@@@@@@@userLoginMutation', error)
      message.error('登录失败:' + error.message)
    },
  })

  const userRegisterMutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (response) => {
      console.log('@@@@@@@@userRegistrMutation', response)
      updateUserProfile(response.data)
      login()
      nav(APPHOME)
      message.success('注册成功')
    },
  })

  const onFinish = async (values: any) => {
    console.log('@@@onFinish values is -----', values)
    // 校验账号密码
    if (type === 'register') {
      userRegisterMutation.mutate(values)
    } else {
      // if (values.password === '123456') {
      //   login()
      //   nav(APPHOME)
      //   message.success('登录成功')
      //   return
      // }
      userLoginMutation.mutate(values)
    }
  }

  return (
    <>
      <div className={style.wrap} style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover' }}>
        <div className={style.loginForm}>
          {type === 'login' ? <LoginForm onFinish={onFinish} /> : <RegisterForm onFinish={onFinish} />}

          <div className={style.loginFooter}>
            <span>
              还没有账号？
              <span className={style.link} onClick={() => setType((type) => (type === 'register' ? 'login' : 'register'))}>
                {type === 'register' ? '登录' : '注册'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
