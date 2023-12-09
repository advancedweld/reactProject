/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:23:27
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-09-24 12:24:37
 * @FilePath: \reactProject\src\App\views\HooksTestCom\useReducer_.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState, useEffect, useRef, useReducer } from 'react'
import { useLatest } from 'ahooks'
import { _useLatest } from './useLatest'

type UseReducer_ = <TData>(reducer: (state: TData) => number, initialData: TData) => [TData, (action: any) => void]

export const useReducer_: UseReducer_ = (reducer, initialData) => {
  const dispatch = (action: any) => {
    console.log('@@@diapatch')
  }
  return [initialData, dispatch]
}

export default () => {
  const [count, setCount] = useReducer((x) => x + 1, 0)

  // const [count, setCount] = useReducer_((x) => x + 1, 0)

  return (
    <>
      <p>count: {count}</p>
      <button onClick={() => setCount()}>count++</button>
    </>
  )
}
