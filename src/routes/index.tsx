/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\routes\index.tsx
 */

import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
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
      path: '/app/home',
      label: '首页',
      element: <h1>APP首页</h1>,
    },
    {
      path: NETREQUEST,
      label: '网络请求',
      children: [
        {
          path: '/app/netRequest/base',
          label: '请求gpt',
          element: <NetRequest />,
        },
        {
          path: '/app/netRequest/nest',
          label: '请求nest',
          element: <h1>请求 nest</h1>,
        },
      ],
    },
    {
      path: '/app/myCollect',
      label: '收藏集',
      element: lazyLoad(() => import('@view/MyCollect')),
    },
    {
      path: GROUP,
      label: 'GROUP',
      element: lazyLoad(() => import('@view/Group')),
    },
    {
      path: '/app/nest-request',
      label: 'nest请求',
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
      path: '/app/image-editor/home',
      label: '图片编辑器',
      element: lazyLoad(() => import('@view/imageEditor')),
      // element: <ImageEditor />,
    },
    {
      path: '/app/car/home',
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

  baseRoutes,
  {
    path: '*',
    label: '无权限页面',
    element: <NoPermission />,
  },
]
const router = createBrowserRouter(routes)
export { baseRoutes, routes, router }
