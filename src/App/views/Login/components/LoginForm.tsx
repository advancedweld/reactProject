/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-12-24 15:11:22
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
type FormType = {
  userName: string
  password: string
}
function LoginForm(props: ILoginForm) {
  const [form] = Form.useForm<any>()

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>欢迎！</h2>

      <Form
        form={form}
        initialValues={{ userName: 'admin', password: '123456' }}
        onFinish={props.onFinish}
        name={'loginForm'}
        style={{ marginTop: '8px' }}
        labelCol={{ flex: '50px' }}
        labelAlign='left'
        autoComplete='off'>
        <Form.Item<FormType> label='账号' name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item<FormType> label='密码' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
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
