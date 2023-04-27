import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input } from 'antd'

import style from './style.module.css'

function Login() {
  const location = useLocation()

  return (
    <div className={style.wrap}>
      <input value={'shuru'}></input>
      <Button>按钮</Button>

      <Input.Search value='搜索哈哈' prefix={<span>ttg</span>}></Input.Search>
    </div>
  )
}

export default Login
