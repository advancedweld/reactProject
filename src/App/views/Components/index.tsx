import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input } from 'antd'
import ChildCom from './childCom'
import style from './style.module.css'

function Login() {
  const location = useLocation()
  const [count, setCount] = useState(1)
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(1)

  return (
    <>
      <div className={style.wrap}>
        <input value={'shuru'}></input>
        <Button>按钮</Button>
        <Input.Search value='搜索哈哈' prefix={<span>ttg</span>}></Input.Search>
      </div>
      <Button onClick={() => setCount1(count1 + 1)}>count1++</Button>
      <Button onClick={() => setCount2(count2 + 1)}>count2++</Button>
      <Button onClick={() => setCount(count + 1)}>count++</Button>
      <h1>{`父组件---${count}`}</h1>
      <ChildCom count={count1} name='组件1'></ChildCom>
      <ChildCom count={count2} name='组件2'></ChildCom>
    </>
  )
}

export default Login
