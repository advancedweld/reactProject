import React, { useState, useEffect } from 'react'
import { Radio, RadioChangeEvent } from 'antd'

import Latest from './useLatest'

type IHOOKS = keyof typeof MAP_COM

const MAP_COM = {
  USELATEST: (props: any) => <Latest {...props}></Latest>,
  OTHER: () => <p>不存在。。。</p>,
}
const options = [
  { label: 'USELATEST', value: 'USELATEST' },
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

      <Ele name='自定义hooks组件' />
    </>
  )
}
