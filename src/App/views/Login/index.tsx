/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-26 13:40:30
 * @FilePath: \webpackProject\src\App\views\Login\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { LOGIN, APP, GROUP, ABOUT, HOOKS } from 'routes/constant'

import style from './style.module.css'

function Login() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })
  return (
    <>
      <div className={style.wrap}>
        <h1> login </h1>
        <Link to={APP}> 首页</Link>
      </div>

      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
