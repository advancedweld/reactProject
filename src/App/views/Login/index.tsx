/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-21 17:43:29
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { APP } from 'routes/constant'
import useUserProfileStore from 'store/userProfile'

import { userLogin } from './service/api'

import style from './style.module.css'

function Login() {
  const { userName, logout, changeUserName, login } = useUserProfileStore((state) => state)

  const [form] = Form.useForm<any>()

  const nav = useNavigate()

  // 用户登录请求
  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      nav(APP)
      message.success('登录成功')
    },
  })

  const onFinish = async (values: any) => {
    console.log('@@@onFinish values is -----', values)
    // 校验账号密码
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
          <h2 style={{ textAlign: 'center' }}>欢迎！</h2>
          <Form
            form={form}
            onFinish={onFinish}
            name={'loginForm'}
            style={{ marginTop: '8px' }}
            labelCol={{ flex: '50px' }}
            labelAlign='left'
            autoComplete='off'>
            <Form.Item label='账号' name='username'>
              <Input style={{ height: '40px' }} />
            </Form.Item>
            <Form.Item label='密码' name='pwd'>
              <Input style={{ height: '40px' }} type='password' />
            </Form.Item>

            <Button className={style.loginBtn} htmlType='submit' type='primary' loading={false}>
              登录
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login
