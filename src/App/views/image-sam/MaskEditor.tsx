/*
 * @Author: xiangshangzhi
 * @Date: 2023-07-07 10:15:41
 * @FilePath: \reactProject\src\App\views\image-sam\index.tsx
 * @Description:
 */

/** canvas像素操作：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas */
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import { Button, Space } from 'antd'
import { useThrottleFn } from '@/utils/hooks'
import { pickByCoordinate, segmentData, highlightMatchingPos, filterByMask } from './utils'
import { downloadFile } from '@/utils'
import styles from './index.module.css'

// canvas画面尺寸
const MAX_CANVAS_WIDTH = 800
const MAX_CANVAS_HEIGHT = 600
const maxSizeStyle: React.CSSProperties = { maxWidth: `${MAX_CANVAS_WIDTH}px`, maxHeight: `${MAX_CANVAS_HEIGHT}px` }

type MaskCanvasRef = any
type Props = {
  // 原图
  originImgSrc: string
  // 色块图
  maskSrc?: string
}
const MaskEditor = React.forwardRef<MaskCanvasRef, Props>(({ originImgSrc, maskSrc }, ref) => {
  // 内存里存放的色块图canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null)
  // 色块图分区位置信息
  const colr2PosMapRef = useRef<Map<string, Set<number>>>()
  // 固定高亮色色块，通过色块找对对应坐标
  const [fixedColor, setFixedColor] = useState<string[]>([])
  // 鼠标悬浮位置的颜色
  const colorRef = useRef<string>()

  const getCanvasContent = () => {
    if (highlightCanvasRef.current) {
      return highlightCanvasRef.current.toDataURL()
    }
    return null
  }
  useImperativeHandle(ref, () => ({
    getCanvasContent,
  }))

  // 色块图画到canvas里，分块
  useEffect(() => {
    if (!maskSrc) return
    const img = new Image()
    img.src = maskSrc
    img.onload = () => {
      // 装载到canvas中
      const { naturalWidth: canvasW, naturalHeight: canvasH } = img
      // 直接内存里创建一个masksrc的canvas，避免暴露技术
      const canvasEle = document.createElement('canvas')
      canvasRef.current = canvasEle
      const highlightcanvasEle = highlightCanvasRef.current

      if (canvasEle && highlightcanvasEle) {
        // 设置画布尺寸，不要直接通过css设置，会造成图形失真
        canvasEle.width = canvasW
        canvasEle.height = canvasH
        highlightcanvasEle.width = canvasW
        highlightcanvasEle.height = canvasH

        // 缩放 Canvas 元素的显示尺寸，同时保持实际尺寸不变 注意用transform属性实现，maxwidth和maxheight属性亲测无效
        const scaleFactor = Math.min(MAX_CANVAS_WIDTH / canvasW, MAX_CANVAS_HEIGHT / canvasH, 1)
        highlightcanvasEle.style.transform = `scale(${scaleFactor})`
        highlightcanvasEle.style.transformOrigin = 'top left'

        const ctx = canvasEle.getContext('2d', {
          willReadFrequently: true,
        })

        if (!ctx) return
        ctx.drawImage(img, 0, 0, canvasW, canvasH)
        const imageData = ctx.getImageData(0, 0, canvasW, canvasH)
        if (imageData?.data) {
          // 色块分割
          colr2PosMapRef.current = segmentData(imageData.data)
        }
      }
    }
  }, [maskSrc])

  // 固定高亮区域坐标
  const fixedPos = React.useMemo(() => {
    return fixedColor.reduce((pre, rgba) => {
      return new Set([...pre, ...(colr2PosMapRef.current?.get(rgba) || [])])
    }, new Set<number>([]))
  }, [fixedColor])
  // 在蒙版层上触发mousemove事件，利用事件触发坐标在原图层上拿到对应颜色以及色块坐标
  const canvasMousemove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const originalCanvas = canvasRef.current
    const highlightCanvas = highlightCanvasRef.current
    if (!originalCanvas || !highlightCanvas) return
    const rgba = pickByCoordinate(originalCanvas, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    // 选取的颜色发生改变，更新高亮区域
    if (rgba !== colorRef.current) {
      colorRef.current = rgba
      const pos = colr2PosMapRef.current?.get(rgba)
      if (pos) {
        highlightMatchingPos(highlightCanvasRef.current, fixedPos, pos)
      }
    }
  }

  const canvasMouseleave = () => {
    const originalCanvas = canvasRef.current
    const highlightCanvas = highlightCanvasRef.current
    if (!originalCanvas || !highlightCanvas) return
    highlightMatchingPos(highlightCanvasRef.current, fixedPos, new Set([]))
  }

  // 固定高亮位置改变后重新渲染
  useEffect(() => {
    if (highlightCanvasRef.current) {
      // 高亮固定位置
      const fixedPos = fixedColor.reduce((pre, rgba) => {
        return new Set([...pre, ...(colr2PosMapRef.current?.get(rgba) || [])])
      }, new Set<number>([]))
      highlightMatchingPos(highlightCanvasRef.current, fixedPos, new Set([]))
    }
  }, [fixedColor, highlightCanvasRef.current])

  const canvasClick = (e: any) => {
    const originalCanvas = canvasRef.current
    if (!originalCanvas) return
    const rgba = pickByCoordinate(originalCanvas, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    // 根据是否已选色块高亮或者清除高亮
    const newColorArr = fixedColor.includes(rgba) ? fixedColor.filter((color) => color !== rgba) : [...fixedColor, rgba]
    setFixedColor(newColorArr)
  }

  const downloadMask = () => {
    const maskImg = highlightCanvasRef.current?.toDataURL()
    if (maskImg) {
      downloadFile(maskImg, `iddi_paint_mask${Date.now()}`)
    }
  }

  const resetMask = () => {
    const highlightCanvas = highlightCanvasRef.current
    if (!highlightCanvas) return
    const ctx = highlightCanvas.getContext('2d', {
      willReadFrequently: true,
    })
    if (!ctx) return
    const canvasData = ctx.getImageData(0, 0, highlightCanvas.width, highlightCanvas.height)
    canvasData.data.fill(0)
    console.log('@@@@@canvasData', canvasData.data)
    ctx.putImageData(canvasData, 0, 0)
    // 清空已固定的色块
    setFixedColor([])
  }
  // 导出原图
  const downloadSrcImg = () => {
    const img = new Image()
    img.src = originImgSrc
    img.onload = () => {
      if (!highlightCanvasRef.current) return
      const filterImg = filterByMask(img, highlightCanvasRef.current)
      if (filterImg) {
        downloadFile(filterImg, `iddi_paint_mask${Date.now()}`)
      }
    }
  }

  return (
    <div className={styles.wrap}>
      {/* <h1>图片编辑器</h1> */}
      <Space style={{ position: 'absolute', zIndex: 1 }}>
        {/* <Button onClick={downloadMask}>导出蒙版</Button> */}
        <Button onClick={resetMask}>重置蒙版</Button>
        <Button onClick={downloadSrcImg}>导出切图</Button>
      </Space>

      <div style={{ width: `${MAX_CANVAS_WIDTH}px`, height: `${MAX_CANVAS_HEIGHT}px` }} className={styles.canvasContainer}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={originImgSrc} style={maxSizeStyle} draggable={true} />
          <canvas
            ref={highlightCanvasRef}
            className={styles.highlightCanvasStyle}
            onClick={canvasClick}
            onMouseMove={useThrottleFn(canvasMousemove, 100)}
            onMouseLeave={canvasMouseleave}></canvas>
        </div>
      </div>
    </div>
  )
})

export default MaskEditor
