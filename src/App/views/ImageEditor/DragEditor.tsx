/*
 * @Author: xiangshangzhi
 * @Date: 2023-10-19 14:05:55
 * @FilePath: \reactProject\src\App\views\imageEditor\DragEditor.tsx
 * @Description: 已废弃
 */

import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import { Button, Space } from 'antd'
import img2imgActiveLogo from '@/assets/img/img2img_active.png'
import zjuLogo from '@/assets/img/zju_logo.png'
import styles from './index.module.css'

const DraggableImage: React.FC<{ src: string }> = ({ src }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const startPosRef = useRef<{ x: number; y: number } | null>(null)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('@@@dragstart', e)
    // 记录拖拽开始的位置
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
    }
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y
  }
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log('@@@drag ing', e.clientX, e.clientY)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const offsetX = e.clientX - (startPosRef?.current?.x || 0)
    const offsetY = e.clientY - (startPosRef?.current?.y || 0)
    setPosition((previous) => ({
      x: previous.x + offsetX,
      y: previous.y + offsetY,
    }))
    console.log('@@@drag end', offsetX, offsetY)
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()

    // 设置缩放的最小值和最大值，根据需要调整
    const minScale = 0.5
    const maxScale = 2

    // 计算新的缩放比例
    const newScale = scale - e.deltaY / 100
    console.log('@@@@@newScale', newScale)
    // 限制缩放比例在最小值和最大值之间
    if (newScale >= minScale && newScale <= maxScale) {
      setScale(newScale)
    }
  }
  return (
    <div
      className={styles.dragImageContainer}
      style={{ position: 'absolute', left: position.x, top: position.y, transform: `scale(${scale})` }}
      draggable='true'
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onWheel={handleWheel} // 鼠标滚轮事件用于缩放
    >
      <img src={src} alt='Draggable Image' />
    </div>
  )
}

// canvas画面尺寸
const MAX_CANVAS_WIDTH = 800
const MAX_CANVAS_HEIGHT = 600
const maxSizeStyle: React.CSSProperties = { maxWidth: `${MAX_CANVAS_WIDTH}px`, maxHeight: `${MAX_CANVAS_HEIGHT}px`, border: '1px solid red' }

type Props = {
  // 原图
  originImgSrc?: string
  // 色块图
  maskSrc?: string
}
const DragEditor: React.FC<Props> = ({ originImgSrc, maskSrc }) => {
  // const handleDragStart = (e: any) => {
  //   console.log('@@@drag start', e)
  // }

  return (
    <div className={styles.wrap} style={{ background: 'gray' }}>
      <h1>图片拖拽</h1>
      <div style={{ height: '200px', position: 'relative', border: '1px solid red' }}>
        <DraggableImage src={img2imgActiveLogo} />
        <DraggableImage src={zjuLogo} />
        <DraggableImage src={img2imgActiveLogo} />
        <DraggableImage src={zjuLogo} />
        <DraggableImage src={img2imgActiveLogo} />
        <DraggableImage src={zjuLogo} />
      </div>
    </div>
  )
}

export default DragEditor
