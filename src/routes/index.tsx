/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \webpackProject\src\routes\index.tsx
 */

import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Group from '@view/Group'
import About from '@view/About'
import Hooks from '@view/HooksTestCom'
import CustomerComponents from '@view/Components'
import NoPermission from '@view/NoPermission'
import App from '../App'

import {
  LOGIN,
  APP,
  GROUP,
  ABOUT,
  HOOKS,
  COMPONENT,
  NOPERMISSION,
} from './constant'

const Login = React.lazy(() => import('@view/Login'))
const routes = [
  {
    path: '/',
    label: '登录',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: LOGIN,
    label: '登录',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: APP,
    label: 'app',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        label: '首页',
        element: <h1>APP首页</h1>,
      },
      {
        path: GROUP,
        label: 'GROUP',
        element: <Group />,
      },
      {
        path: HOOKS,
        label: 'HOOKS',
        element: <Hooks />,
      },
      {
        path: COMPONENT,
        label: '自定义组件',
        element: <CustomerComponents />,
      },
      {
        path: ABOUT,
        label: 'ABOUT(切换页面拦截)',
        element: <About />,
      },
    ],
  },
  {
    path: '*',
    label: '无权限页面',
    element: <NoPermission />,
  },
]

const router = createBrowserRouter(routes)
export { routes, router }
