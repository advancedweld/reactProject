/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\Performance\index.tsx
 * @Description: 性能分析 参考 https://juejin.cn/post/7309040097936474175
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-01-23 10:24:00
 *
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'

import style from './style.module.css'

//  闭包导致内存泄漏，可以在控制台的内存tab--添加堆快照--里查看内存泄漏
const res = []
function Entry() {
  function fn1() {
    const arr = new Array(10000) // 这里设置了一个很大的数组对象

    const b = 3

    function fn2() {
      const c = [1, 2, 3]
    }

    fn2()

    return arr
  }

  const handleClick = () => {
    console.log('点击了')
    res.push(fn1())
  }

  const handleClick1 = () => {
    const arr = new Array(10000) // 这里设置了一个很大的数组对象
  }
  const getmemoryInfo = () => {
    console.log('内存信息')
    const memoryInfo = (window.performance as any).memory
    if (memoryInfo) {
      console.log('Memory used: ' + memoryInfo.usedJSHeapSize / (1024 * 1024) + ' MB')
    }
    // console.log(window.performance.memory)
  }
  return (
    <div>
      <h1>性能</h1>
      <div>
        <Button onClick={handleClick}>插入数组(闭包)</Button>
        <Button onClick={handleClick1}>插入数组</Button>
        <Button onClick={getmemoryInfo}>获取内存信息</Button>
      </div>
    </div>
  )
}

export default Entry
