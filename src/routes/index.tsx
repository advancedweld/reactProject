/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\routes\index.tsx
 */

import React, { Suspense } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import About from '@view/About'
import NetRequest from '@view/NetRequest'
import NoPermission from '@view/NoPermission'
import AppComponent from '../App/layout'

import { LOGIN, APP, GROUP, ABOUT, HOOKS, COMPONENT, NETREQUEST, NOPERMISSION } from './constant'

const lazyLoad = (importModule: () => Promise<{ default: React.ComponentType<any> }>) => {
  const Ele = React.lazy(importModule)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ele />
    </Suspense>
  )
}

const Login = React.lazy(() => import('@view/Login'))
const baseRoutes = {
  path: APP,
  label: 'app首页',
  element: <AppComponent></AppComponent>,
  children: [
    {
      path: NETREQUEST,
      label: '网络请求',
      children: [
        {
          path: '/netRequest/base',
          label: '请求gpt',
          element: <NetRequest />,
        },
        {
          path: '/netRequest/nest',
          label: '请求nest',
          element: <h1>请求 nest</h1>,
        },
      ],
    },
    {
      path: '/myCollect',
      label: '收藏集',
      children: [
        {
          path: '/myCollect/flashdot',
          label: '粒子效果',
          element: lazyLoad(() => import('@view/MyCollect')),
        },
        {
          path: '/myCollect/cell',
          label: '元胞自动机',
          element: lazyLoad(() => import('@view/MyCollect/GenerateCell')),
        },
      ],
      // element: lazyLoad(() => import('@view/MyCollect')),
    },
    {
      path: GROUP,
      label: 'GROUP',
      element: lazyLoad(() => import('@view/Group')),
    },
    {
      path: '/nest-request',
      label: '书籍管理',
      element: lazyLoad(() => import('@view/NestRequest')),
    },
    {
      path: HOOKS,
      label: 'HOOKS',
      element: lazyLoad(() => import('@view/HooksTestCom')),
      // element: <Hooks />,
    },
    {
      path: COMPONENT,
      label: '自定义组件',
      element: lazyLoad(() => import('@view/Components')),
    },
    {
      path: 'app/Mobx',
      label: '响应式(mobx)',
      element: lazyLoad(() => import('@view/Mobx')),
    },
    {
      path: 'app/Performance',
      label: '性能',
      element: lazyLoad(() => import('@view/Performance')),
    },
    {
      path: '/image-editor/home',
      label: '图片编辑器',
      element: lazyLoad(() => import('@view/ImageEditor')),
      // element: <ImageEditor />,
    },
    {
      path: '/car/home',
      label: '汽车',
      element: <h1>汽车首页</h1>,
    },
    {
      path: ABOUT,
      label: 'ABOUT(切换页面拦截)',
      element: <About />,
    },
  ],
}

const routes = [
  {
    path: '/',
    label: '登录',
    // element: <AppComponent></AppComponent>,
    element: lazyLoad(() => import('../App/layout')),
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
    path: '/home',
    label: '首页',
    element: <AppComponent></AppComponent>,
    children: [
      {
        path: '/home',
        label: '网络请求',
        element: <h1>首页</h1>,
      },
    ],
  },
  baseRoutes,
  {
    path: '*',
    label: '无权限页面',
    element: <NoPermission />,
  },
]
const router = createBrowserRouter(routes)
export { baseRoutes, routes, router }
