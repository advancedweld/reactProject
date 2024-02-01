/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\Mobx\index.tsx
 * @Description: https://zh.mobx.js.org/react-integration.html
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-02-01 10:52:38
 *
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import style from './style.module.css'

class Timer {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this)
  }

  increaseTimer() {
    this.secondsPassed += 1
  }
}

const myTimer = new Timer()

const Entry = observer(() => {
  useEffect(() => {
    const timer = setInterval(() => {
      // 通过方法修改响应式对象的属性
      // myTimer.increaseTimer()
      // 直接修改响应式对象里的属性也能触发更新
      myTimer.secondsPassed += 2
    }, 1000)

    return () => {
      if (timer) {
        console.log('clearInterval')
        clearInterval(timer)
      }
    }
  }, [])
  return (
    <div>
      <h1>响应式</h1>
      <div>Seconds passed: {myTimer.secondsPassed}</div>
    </div>
  )
})

export default Entry
