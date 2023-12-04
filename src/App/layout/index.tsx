/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\index.tsx
 */

import React, { Suspense } from 'react'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from 'routes'
import Header from './header'

const Entry = () => {
  console.log('Entry')
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <h1>hello, world</h1>
    </>
  )
}

export default Entry
