/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\routes\index.tsx
 */

import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Group from '@view/Group'
import About from '@view/About'
import NetRequest from '@view/NetRequest'
import Hooks from '@view/HooksTestCom'
import CustomerComponents from '@view/Components'
import NoPermission from '@view/NoPermission'
import ImageEditor from '@view/ImageEditor'
import AppComponent from '../App/layout'

import { LOGIN, APP, GROUP, ABOUT, HOOKS, COMPONENT, NETREQUEST, FRUIT, BANANA, APPLE, ORANGE, NOPERMISSION } from './constant'

const lazyLoad = (importModule: () => Promise<{ default: React.ComponentType<any> }>) => {
  const Ele = React.lazy(importModule)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ele />
    </Suspense>
  )
}

const Login = React.lazy(() => import('@view/Login'))
const baseRoutes = [
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
    label: 'app首页',
    element: <AppComponent></AppComponent>,
  },
  // {
  //   path: '/app/home',
  //   label: '首页',
  //   element: <h1>APP首页</h1>,
  // },
  // {
  //   path: NETREQUEST,
  //   label: '网络请求',
  //   element: <NetRequest />,
  // },
  // {
  //   path: GROUP,
  //   label: 'GROUP',
  //   element: lazyLoad(() => import('@view/Group')),
  //   // element: <Group />,
  // },
  // {
  //   path: HOOKS,
  //   label: 'HOOKS',
  //   element: lazyLoad(() => import('@view/HooksTestCom')),
  //   // element: <Hooks />,
  // },
  // {
  //   path: COMPONENT,
  //   label: '自定义组件',
  //   element: <CustomerComponents />,
  // },
  // {
  //   path: ABOUT,
  //   label: 'ABOUT(切换页面拦截)',
  //   element: <About />,
  // },
  // {
  //   path: `${FRUIT}/home`,
  //   label: '首页',
  //   element: <h1>水果首页</h1>,
  // },
  // {
  //   path: BANANA,
  //   label: 'banana',
  //   element: <h1>香蕉</h1>,
  //   children: [
  //     {
  //       path: `${BANANA}/list`,
  //       label: '列表',
  //       element: <h1>香蕉列表</h1>,
  //     },
  //     {
  //       path: `${BANANA}/detail`,
  //       label: '详情',
  //       element: <h1>香蕉详情</h1>,
  //     },
  //   ],
  // },
  // {
  //   path: APPLE,
  //   label: 'apple',
  //   element: <h1>苹果</h1>,
  // },
  // {
  //   path: ORANGE,
  //   label: 'orange',
  //   element: <h1>橘子</h1>,
  // },
  // {
  //   path: '/image-editor/home',
  //   label: '首页',
  //   element: <ImageEditor />,
  // },
  // {
  //   path: '/car/home',
  //   label: '首页',
  //   element: <h1>汽车首页</h1>,
  // },
]

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

  ...baseRoutes,
  {
    path: '*',
    label: '无权限页面',
    element: <NoPermission />,
  },
]
const router = createBrowserRouter(routes)
export { baseRoutes, routes, router }
