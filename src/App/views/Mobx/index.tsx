/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\Mobx\index.tsx
 * @Description: https://zh.mobx.js.org/react-integration.html
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-02-01 10:47:18
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
  return (
    <div>
      <h1>响应式</h1>
      <div>Seconds passed: {myTimer.secondsPassed}</div>
    </div>
  )
})

setInterval(() => {
  myTimer.increaseTimer()
}, 1000)

export default Entry
