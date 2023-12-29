/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-12-22 20:17:49
 * @FilePath: \reactProject\src\App\views\Login\components\RegisterForm.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { Button, message, Form, Input } from 'antd'

import style from '../style.module.css'

interface IRegisterForm {
  onFinish: (values: any) => void
}
function LoginForm(props: IRegisterForm) {
  const [form] = Form.useForm<any>()

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>欢迎注册</h2>

      <Form
        form={form}
        onFinish={props.onFinish}
        name={'loginForm'}
        style={{ marginTop: '8px' }}
        labelCol={{ flex: '50px' }}
        labelAlign='left'
        autoComplete='off'>
        <Form.Item label='账号' name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input style={{ height: '40px' }} type='password' />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='passwordRepeat'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              },
            }),
          ]}>
          <Input style={{ height: '40px' }} type='password' />
        </Form.Item>
        <Button className={style.submitBtn} htmlType='submit' type='primary' loading={false}>
          注册
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
