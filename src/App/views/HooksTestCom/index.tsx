/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:22:11
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-27 19:40:06
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState, useEffect } from 'react'
import { Radio, RadioChangeEvent } from 'antd'

import Latest from './useLatest'
import Hover from './useHover'
import ThrottleFn from './useThrotleFn'
import DenounceValue from './useDenounceValue'
import Count from './useCount'

type IHOOKS = keyof typeof MAP_COM

const MAP_COM = {
  USELATEST: (props: any) => <Latest {...props}></Latest>,
  Hover: (props: any) => <Hover {...props}></Hover>,
  ThrottleFn: (props: any) => <ThrottleFn {...props}></ThrottleFn>,
  DenounceValue: (props: any) => <DenounceValue {...props}></DenounceValue>,
  Count: (props: any) => <Count {...props}></Count>,
  OTHER: () => <p>不存在。。。</p>,
}
const options = [
  { label: 'USELATEST', value: 'USELATEST' },
  { label: 'Hover', value: 'Hover' },
  { label: 'ThrottleFn', value: 'ThrottleFn' },
  { label: 'DenounceValue', value: 'DenounceValue' },
  { label: 'Count', value: 'Count' },
  { label: 'OTHER', value: 'OTHER' },
]

export default () => {
  // const [curHook, setCurHook] = useState<IHOOKS>('USELATEST')
  const [curHook, setCurHook] = useState<IHOOKS>('OTHER')
  const Ele = MAP_COM[curHook]
  const onChange = (e: RadioChangeEvent) => {
    setCurHook(e.target.value)
  }

  return (
    <>
      <p>自定义hooks</p>
      <Radio.Group
        onChange={onChange}
        value={curHook}
        options={options}></Radio.Group>

      <div
        style={{
          backgroundColor: 'whitesmoke',
          padding: '24px',
          margin: '16px',
        }}>
        <Ele name='自定义hooks组件' />
      </div>
    </>
  )
}
