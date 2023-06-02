/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \webpackProject\src\routes\index.tsx
 */

import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Group from '@view/Group'
import About from '@view/About'
import NetRequest from '@view/NetRequest'
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
  NETREQUEST,
  FRUIT,
  BANANA,
  APPLE,
  ORANGE,
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
        path: '/app/home',
        label: '首页',
        element: <h1>APP首页</h1>,
      },
      {
        path: NETREQUEST,
        label: '网络请求',
        element: <NetRequest />,
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
    path: FRUIT,
    label: '水果',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: `${FRUIT}/home`,
        label: '首页',
        element: <h1>水果首页</h1>,
      },
      {
        path: BANANA,
        label: 'banana',
        element: <h1>香蕉</h1>,
        children: [
          {
            path: `${BANANA}/list`,
            label: '列表',
            element: <h1>香蕉列表</h1>,
          },
          {
            path: `${BANANA}/detail`,
            label: '详情',
            element: <h1>香蕉详情</h1>,
          },
        ],
      },
      {
        path: APPLE,
        label: 'apple',
        element: <h1>苹果</h1>,
      },
      {
        path: ORANGE,
        label: 'orange',
        element: <h1>橘子</h1>,
      },
    ],
  },
  {
    path: '/car/home',
    label: '汽车',
    element: <App />,
    children: [
      {
        path: '/car/home',
        label: '首页',
        element: <h1>汽车首页</h1>,
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
