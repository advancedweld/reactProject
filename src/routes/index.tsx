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
import App from '../App'


import {LOGIN, APP, GROUP,ABOUT,HOOKS} from './constant'
const Login = React.lazy(() => import('@view/Login'))
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: LOGIN,
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: APP,
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: GROUP,
        element: <Group />,
      },
      {
        path: ABOUT,
        element: <About />,
      },
      {
        path: HOOKS,
        element: <Hooks />,
      },
    ],
  },
])
export { router }
