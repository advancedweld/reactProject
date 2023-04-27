/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:23:27
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-27 19:49:15
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\useCount.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState, useEffect, useRef } from 'react'
import { useLatest } from 'ahooks'
import { _useLatest } from './useLatest'

export const useCount: (initialCount: number, delay?: number) => any = (
  value,
  delay = 1000,
) => {
  const [count, setCount] = useState(value)
  useEffect(() => {
    const interval = setInterval(() => {
      /* 到0后重新计数 */
      setCount((count) => (count === 0 ? value : count - 1))
    }, delay)
    return () => clearInterval(interval)
  }, [])
  return count
}

export default () => {
  const count = useCount(5)
  return (
    <>
      <p>count: {count}</p>
    </>
  )
}
