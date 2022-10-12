/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: /webpackProject/src/App/routes/index.tsx
 */

import React from 'react'
import Login from '@view/Login'
import Group from '@view/Group'
import About from '@view/About'

//编写基本的路由路线，path为路径，component为对应渲染的组件，exact属性决定是否精准匹配
const routes = [
  {
    path: '/',
    component: <Login />,
    exact: true,
  },
  {
    path: '/group',
    component: <Group />,
  },
  {
    path: '/about',
    component: <About />,
  },
]

//将路由表数组导出
export default routes
