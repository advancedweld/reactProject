/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\MyCollect\index.tsx
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-21 11:27:31
 *
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'

import style from './style.module.css'

function Entry() {
  function pop(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('@@@@evt', evt)
    for (let i = 0; i < 30; i++) {
      createParticle(evt.clientX, evt.clientY)
    }
  }

  function createParticle(x: number, y: number) {
    console.log('@@@@@@createParticle', x, y)
    const particle = document.createElement('div')
    particle.classList.add('particle')
    const size = Math.floor(Math.random() * 20 + 5)
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`
    const destinationX = x + (Math.random() - 0.5) * 2 * 75
    const destinationY = y + (Math.random() - 0.5) * 2 * 75
    const animation = particle.animate(
      [
        {
          transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 500 + Math.random() * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200,
      },
    )
    animation.onfinish = () => {
      particle.remove()
    }
    document.body.appendChild(particle)
  }

  return (
    <>
      <div className={style.wrap}>
        <h1> 我的收藏 </h1>
        <Button type='primary' onClick={(evt) => pop(evt)}>
          点击我
        </Button>
      </div>
    </>
  )
}

export default Entry
