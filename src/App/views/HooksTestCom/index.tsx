/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:22:11
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-07-01 17:56:03
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\index.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import { Radio, RadioChangeEvent } from 'antd'

import { routes } from 'routes'

import Latest from './useLatest'
import Hover from './useHover'
import ThrottleFn from './useThrotleFn'
import DenounceValue from './useDenounceValue'
import Count from './useCount'
import GetVideo from './useGetVideo'

type IHOOKS = keyof typeof MAP_COM

const MAP_COM = {
  USELATEST: (props: any) => <Latest {...props}></Latest>,
  Hover: (props: any) => <Hover {...props}></Hover>,
  ThrottleFn: (props: any) => <ThrottleFn {...props}></ThrottleFn>,
  DenounceValue: (props: any) => <DenounceValue {...props}></DenounceValue>,
  Count: (props: any) => <Count {...props}></Count>,
  GetVideo: (props: any) => <GetVideo {...props}></GetVideo>,
  OTHER: () => <p>不存在。。。</p>,
}
const options = Object.keys(MAP_COM).map((key) => ({
  label: key,
  value: key,
}))

export default () => {
  // const [curHook, setCurHook] = useState<IHOOKS>('USELATEST')
  const [curHook, setCurHook] = useState<IHOOKS>('OTHER')
  const Ele = MAP_COM[curHook]
  const onChange = (e: RadioChangeEvent) => {
    setCurHook(e.target.value)
  }

  const ele = useRoutes(routes)
  console.log('🚀 ~ file: index.tsx:51 ~ ele:', ele)

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
