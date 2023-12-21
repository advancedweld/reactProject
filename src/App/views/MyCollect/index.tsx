/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\MyCollect\index.tsx
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-21 10:20:30
 *
 */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import style from './style.module.css'

function Entry() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })
  return (
    <>
      <div className={style.wrap}>
        <h1> 我的收藏 </h1>
      </div>
    </>
  )
}

export default Entry
