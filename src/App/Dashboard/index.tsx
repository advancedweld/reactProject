/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-26 13:05:16
 * @FilePath: \webpackProject\src\App\Dashboard\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import ButtonLink from './ButtonLink'
import LinkArea from './LinkArea'

import styles from './style.module.css'

function Dashboard() {
  const location = useLocation()
  const nav = useNavigate()
  const refreshCount = useRef(0)
  useEffect(() => {
    console.log('@@@fresh is -----', refreshCount.current)
    refreshCount.current += 1
    if (refreshCount.current === 1000) {
      refreshCount.current = 0
    }
  })

  return (
    <div className='Dashboard'>
      <h3
        onClick={() => nav('/')}
        style={{
          cursor: 'pointer',
        }}>
        hello React
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <LinkArea />
        <ButtonLink />
      </div>

      <div className={styles.wrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
