/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: /webpackProject/src/App/routes/index.tsx
 */

import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@view/Login'
import Group from '@view/Group'
import About from '@view/About'
import Hooks from '@view/HooksTestCom'
import App from '../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
        // exact: true,
      },
      {
        path: '/group',
        element: <Group />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/hooks',
        element: <Hooks />,
      },
    ],
  },
])
export { router }
