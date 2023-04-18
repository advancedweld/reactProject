/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-13 16:53:08
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-18 15:53:17
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\useThrotleFn.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from 'react'
import { Space } from 'antd'
import { _useLatest } from './useLatest'

/* 自己实现节流函数 */
export function _useThrottleFn(func: Function, delay = 1000) {
  const timerRef = useRef<any>()
  const fnRef = _useLatest(func)

  /* 组件卸载后清理计时器 */
  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )
  return React.useMemo(
    () =>
      (...args: any[]) => {
        if (!timerRef.current) {
          /* 立即执行 */
          // func(...args)
          timerRef.current = setTimeout(() => {
            /* 延迟执行 */
            fnRef.current?.(...args)
            timerRef.current = null
          }, delay)
        }
      },
    [],
  )
}

export default () => {
  const _handleClick = (e) => {
    console.log('@@@@按钮点击-----', e)
  }

  const handleClick = _useThrottleFn(_handleClick, 500)
  return (
    <Space>
      <button onClick={handleClick}>节流按钮</button>

      <button onClick={_handleClick}>不节流按钮</button>
    </Space>
  )
}
