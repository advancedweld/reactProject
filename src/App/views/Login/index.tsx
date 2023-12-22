/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-22 16:42:05
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'

import { Link, useNavigate } from 'react-router-dom'
import { APP } from 'routes/constant'
import useUserProfileStore from 'store/userProfile'

import { userLogin, userRegister } from './service/api'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import style from './style.module.css'

function Login() {
  const [type, setType] = React.useState<'login' | 'register'>('login')
  const { userName, logout, changeUserName, login } = useUserProfileStore((state) => state)

  const [form] = Form.useForm<any>()

  const nav = useNavigate()

  // 用户登录请求
  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (response) => {
      console.log('@@@@@@@@userLoginMutation', response)
      login()
      nav(APP)
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
    },
  })

  const onFinish = async (values: any) => {
    console.log('@@@onFinish values is -----', values)
    // 校验账号密码
    if (type === 'register') {
      userRegisterMutation.mutate({
        userName: `xiang${Date.now().toString().slice(-5)}`,
        password: '123456',
        email: `xiang${Date.now().toString().slice(-5)}@gmail.com`,
      })
    } else {
      // userLoginMutation.mutate({
      //   password: '123456',
      // })

      userLoginMutation.mutate(values)
    }
    return
    if (values.username && values.pwd) {
      if (values.pwd === '123456') {
        message.success('登录成功')
        // 更新全局状态
        login()
        changeUserName(values.username)
        nav(APP)
      } else {
        message.error('账号或密码错误')
      }
    } else {
      message.error('账号或密码不能为空')
    }
  }

  return (
    <>
      <div className={style.wrap}>
        <div className={style.loginForm}>
          {type === 'login' ? <LoginForm onFinish={onFinish} /> : <RegisterForm onFinish={onFinish} />}
          <Button className={style.loginBtn} onClick={() => setType((type) => (type === 'register' ? 'login' : 'register'))}>
            {type === 'register' ? '登录' : '注册'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login
