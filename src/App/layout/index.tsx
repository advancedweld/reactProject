/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\index.tsx
 */

import React, { Suspense } from 'react'
import { BrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import AuthWrap from 'App/auth'
import Header from './header'

const Entry = () => {
  console.log('Entry')
  return (
    <>
      <Header />
      <AuthWrap>
        <Outlet />
      </AuthWrap>

      <h1>hello, world</h1>
    </>
  )
}

export default Entry
