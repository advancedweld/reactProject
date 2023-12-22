/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-22 16:13:48
 * @FilePath: \reactProject\src\App\views\Login\components\LoginForm.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'

import style from '../style.module.css'

interface ILoginForm {
  onFinish: (values: any) => void
}
function LoginForm(props: ILoginForm) {
  const [form] = Form.useForm<any>()

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>欢迎！</h2>

      <Form
        form={form}
        onFinish={props.onFinish}
        name={'loginForm'}
        style={{ marginTop: '8px' }}
        labelCol={{ flex: '50px' }}
        labelAlign='left'
        autoComplete='off'>
        <Form.Item label='账号' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item label='密码' name='pwd' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input style={{ height: '40px' }} type='password' />
        </Form.Item>

        <Button className={style.loginBtn} htmlType='submit' type='primary' loading={false}>
          登录
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
