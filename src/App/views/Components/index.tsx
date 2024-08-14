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

  const [batchCount, setBatchCount] = useState(0)
  const handleBatchCountWithFun = () => {
    /**
     * 传递函数能实时拿到最新的state
     * 同时会将多次的操作合并为一次更新，只触发一次
     */
    setBatchCount((pre) => pre + 1)
    setBatchCount((pre) => pre + 2)
  }

  const handleBatchCount = () => {
    /**
     * 这里会形成闭包，捕获batchCount
     * 因此这里两次后的结果是1+2为3
     */
    setBatchCount(batchCount + 1)
    setBatchCount(batchCount + 2)
  }
  useEffect(() => {
    console.log('@@@组件更新batch', batchCount)
  })
  return (
    <>
      <div className={style.wrap}>
        <input defaultValue={'shuru'}></input>
        <Button>按钮</Button>
        <Input.Search value='搜索哈哈' prefix={<span>ttg</span>}></Input.Search>
      </div>
      <Button onClick={() => setCount1(count1 + 1)}>count1++</Button>
      <Button onClick={() => setCount2(count2 + 1)}>count2++</Button>
      <Button onClick={() => setCount(count + 1)}>count++</Button>
      <h1>{`父组件---${count}`}</h1>
      <div>
        <h1>{`setcount批量处理: ${batchCount}`}</h1>
        <Button onClick={handleBatchCount}>count++</Button>
        <Button onClick={handleBatchCountWithFun}>fun count++</Button>
      </div>

      <ChildCom count={count1} name='组件1'></ChildCom>
      <ChildCom count={count2} name='组件2'></ChildCom>
    </>
  )
}

export default Login
