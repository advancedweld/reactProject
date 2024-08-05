/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-08-05 09:47:17
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { APP, APPHOME, LOGIN } from 'routes/constant'
import useUserProfileStore from 'store/userProfile'
import { userLogin, userRegister } from './service/api'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import './style.less'

function Login() {
  const [type, setType] = React.useState<'login' | 'register'>('login')
  const { userProfile, logout, updateUserProfile, login } = useUserProfileStore((state) => state)

  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const nav = useNavigate()

  // 用户登录请求
  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (response) => {
      console.log('@@@@@@@@userLoginMutation', response)

      const { accessToken } = response.data
      localStorage.setItem('access_token', accessToken)
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
      // 注册成功后跳转到登录页面
      message.success('注册成功')
      setType('login')
    },
  })

  const onFinish = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!userName || !password) {
      message.error('用户名和密码不能为空')
      return
    }
    const formData = { userName, password }
    if (type === 'register') {
      if (password !== confirmPassword) {
        message.error('两次密码不一致')
        return
      }
      userRegisterMutation.mutate(formData)
    }
    // 校验账号密码
    if (type === 'login') {
      // 模拟登录 admin 123456
      if (userName === 'admin' && password === '123456') {
        message.success('登录成功')
        login()
        nav(APPHOME)
        return
      }
      userLoginMutation.mutate(formData)
    }
  }

  return (
    <>
      <section>
        <div className='color'></div>
        <div className='color'></div>
        <div className='color'></div>
        <div className='box'>
          {new Array(5).fill(0).map((item, index) => {
            return <div className='square' key={index}></div>
          })}
          <div className='container'>
            <div className='form'>
              <h2>{type === 'login' ? 'Login Form' : 'Register Form'}</h2>
              <form onSubmit={onFinish} action=''>
                {/* 账号 */}
                <div className='inputBox'>
                  <input type='text' placeholder='userName' value={userName} onChange={(e) => setuserName(e.target.value)}></input>
                </div>
                {/* 密码 */}
                <div className='inputBox'>
                  <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {type === 'register' && (
                  <div className='inputBox'>
                    <input type='password' placeholder='Confirm' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                  </div>
                )}

                <motion.div
                  whileHover={{
                    // scaleX: 2,
                    // scaleY: 1.5,
                    scale: 1.2,
                    // transition: { duration: 1 },
                  }}
                  // 用来设置滚动进入动画
                  // initial={{ opacity: 0 }}
                  // whileInView={{ opacity: 1 }}

                  className='submitBox'>
                  <input type='submit' value={type === 'login' ? 'animate-Login' : 'animate-Register'} />
                </motion.div>

                {/* <div className='inputBox'>
                  <input type='submit' value={type === 'login' ? 'Login' : 'Register'} />
                </div> */}

                {/* <p className='forget'>
                  Forgot Password ? <a href='#'>Click Here</a>
                </p> */}
                {type === 'login' ? (
                  <p className='forget'>
                    Don't have an account?{' '}
                    <span style={{ cursor: 'pointer', fontWeight: 800 }} onClick={() => setType('register')}>
                      Sign Up
                    </span>
                  </p>
                ) : (
                  <p className='forget'>
                    Already have an account?{' '}
                    <span style={{ cursor: 'pointer', fontWeight: 800 }} onClick={() => setType('login')}>
                      Login
                    </span>
                  </p>
                )}
                {/* <p className='forget'>
                  Don't have an account ? <a href='#'>Sign Up</a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
