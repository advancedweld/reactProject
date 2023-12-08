/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-12-08 20:57:59
 * @FilePath: \reactProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'

import { useNavigate } from 'react-router-dom'
import { APP } from 'routes/constant'

import useUserProfileStore from 'store/userProfile'

import style from './style.module.css'

function Login() {
  const loginStatus = useUserProfileStore((state) => state.isLogin)
  const login = useUserProfileStore((state) => state.login)
  const logout = useUserProfileStore((state) => state.logout)

  const [form] = Form.useForm<any>()

  const nav = useNavigate()

  const onFinish = async (values: any) => {
    console.log('@@@onFinish values is -----', values)
    // 校验账号密码
    if (values.username && values.pwd) {
      if (values.pwd === '123456') {
        message.success('登录成功')
        // 更新全局状态
        login()
        nav(APP)
      } else {
        message.error('账号或密码错误')
      }
    }
  }
  return (
    <>
      <div className={style.wrap}>
        <div className={style.loginForm}>
          <h1>宝贝，欢迎回家！</h1>
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
