/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-21 10:17:57
 * @FilePath: \reactProject\src\App\views\MyCollect\index.tsx
 * @Description: 粒子效果基于 参考 https://juejin.cn/post/7303718687235768357
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-21 14:51:23
 *
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'

import style from './style.module.css'

function Entry() {
  function createParticle(x: number, y: number) {
    console.log('@@@@@@createParticle', x, y)
    const particle = document.createElement('div')
    particle.classList.add('particle')
    const size = Math.floor(Math.random() * 20 + 5)
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    // particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`

    particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255},${Math.random()})`
    const destinationX = x + (Math.random() - 0.5) * 2 * 90
    const destinationY = y + (Math.random() - 0.5) * 2 * 90
    // 纵向不散开
    // const destinationY = y
    const animation = particle.animate(
      [
        {
          transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0.1,
          // opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200,
      },
    )
    animation.onfinish = () => {
      particle.remove()
    }
    document.body.appendChild(particle)
  }

  const handleGenerateStar = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    for (let i = 0; i < 100; i++) {
      createParticle(evt.clientX, evt.clientY)
    }
  }
  return (
    <>
      <div className={style.wrap} onClick={(evt) => handleGenerateStar(evt)}>
        <h1> 点击触发粒子效果 </h1>
      </div>
    </>
  )
}

export default Entry
