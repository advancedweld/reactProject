/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:22:11
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-27 20:57:46
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\useLatest.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState, useEffect, useRef } from 'react'
import { useLatest } from 'ahooks'

export const _useLatest: <T>(value: T) => React.MutableRefObject<T> = (
  value,
) => {
  const ref = useRef<typeof value>(value)
  ref.current = value
  return ref
}

type A = Omit<
  {
    aa: string
    bb: number
    cc: string
  },
  'aa'
>
export default () => {
  const [count, setCount] = useState(0)

  /* 方案1： ahooks提供的useLatest */
  const latestCountRef = useLatest(count)

  /* 方案2： 自己利用ref记录并更新count实现 */
  const ref = _useLatest(count)

  useEffect(() => {
    const interval = setInterval(() => {
      /* 方案1 */
      // setCount(latestCountRef.current + 1)

      /* 方案2 */
      // setCount(ref.current + 3)
      setCount((count) => count + 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <p>count: {count}</p>
    </>
  )
}
