import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input } from 'antd'

import style from './style.module.css'

/**
 *
 * 父组件更细时，子组件会重新渲染
 * 可以利用react.memo来避免子组件不必要的更新
 */
function ChildCom({ count, name }: { count: number; name: string }) {
  const location = useLocation()

  useEffect(() => {
    console.log('@@@组件更新', name)
  })
  return (
    <div>
      <h2>{`我是子组件-${count}`}</h2>
    </div>
  )
}

export default React.memo(ChildCom)
