/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:23:27
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-04-08 09:51:24
 * @FilePath: \reactProject\src\App\views\HooksTestCom\useCount.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState, useEffect, useRef } from 'react'
import { useLatest } from 'ahooks'
import { _useLatest } from './useLatest'

export const useCount: (initialCount: number, delay?: number) => any = (value, delay = 1000) => {
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

export const _useCount: (initialCount: number, delay?: number) => any = (initialCount, delay = 1) => {
  const timer = React.useRef<any>(null)
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    timer.current = setTimeout(() => {
      setCount(count - 1)
      if (count <= 0) {
        clearTimeout(timer.current)
      }
    }, delay * 1)
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [count])

  // 清除定时器
  const clearCount = () => {
    timer.current && clearTimeout(timer.current)
  }
  // 重新开始计时
  const resumeCount = () => {
    timer.current && clearTimeout(timer.current)
    setCount(initialCount)
  }
  return { clearCount, resumeCount, count }
}

export default () => {
  const count = useCount(5)
  return (
    <>
      <p>count: {count}</p>
    </>
  )
}
