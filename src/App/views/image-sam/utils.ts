/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2024-08-05 10:59:12
 * @FilePath: \reactProject\src\App\views\image-sam\utils.ts
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-08-05 11:00:53
 *
 */
export function pickByCoordinate(canvas: HTMLCanvasElement, offsetX: number, offsetY: number) {
  // willReadFrequently 设置为true提高性能
  // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently

  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  })
  const x = offsetX
  const y = offsetY
  const pixel = ctx!.getImageData(x, y, 1, 1)
  const { data } = pixel
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
  return rgba
}

export const segmentData = (rgbas: Uint8ClampedArray) => {
  const color2PosMap = new Map()
  // 遍历所有像素点，这里会比较耗费时间（性能）
  for (let pixelIndex = 0; pixelIndex < rgbas.length; pixelIndex += 4) {
    const rgba = rgbas.slice(pixelIndex, pixelIndex + 4)
    const [r, g, b, a] = rgba
    const colorKey = `rgba(${r}, ${g}, ${b}, ${a / 255})`
    if (color2PosMap.has(colorKey)) {
      const posSet: Set<number> = color2PosMap.get(colorKey)
      posSet.add(pixelIndex)
    } else {
      color2PosMap.set(colorKey, new Set([pixelIndex]))
    }
  }
  return color2PosMap
}

// 高亮特定位置的像素
export function highlightMatchingPos(canvas: HTMLCanvasElement, fixedPos: Set<number>, pos: Set<number>) {
  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  })
  if (!ctx) return
  // 获取画布的像素数据
  const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // 遍历像素数据，查找与悬浮点颜色相同的像素
  for (let pixelIndex = 0; pixelIndex < canvasData.data.length; pixelIndex += 4) {
    // 改变选中色块颜色
    if (pos.has(pixelIndex) || fixedPos.has(pixelIndex)) {
      if (pos.has(pixelIndex) && fixedPos.has(pixelIndex)) {
        canvasData.data[pixelIndex] = 255 // r
        canvasData.data[pixelIndex + 1] = 10 // g
        canvasData.data[pixelIndex + 2] = 10 // b
        canvasData.data[pixelIndex + 3] = 180 // a设置透明度
      } else {
        canvasData.data[pixelIndex] = 107
        canvasData.data[pixelIndex + 1] = 88
        canvasData.data[pixelIndex + 2] = 228
        canvasData.data[pixelIndex + 3] = 180
      }
    } else {
      canvasData.data[pixelIndex] = 0
      canvasData.data[pixelIndex + 1] = 0
      canvasData.data[pixelIndex + 2] = 0
      canvasData.data[pixelIndex + 3] = 0
    }
  }

  // 将修改后的像素数据绘制回画布
  ctx.putImageData(canvasData, 0, 0)
}

// 根据蒙版抠图
export function filterByMask(originalImg: HTMLImageElement, maskCanvas: HTMLCanvasElement) {
  const { naturalWidth, naturalHeight } = originalImg
  const originalCanvas = document.createElement('canvas')
  originalCanvas.width = naturalWidth
  originalCanvas.height = naturalHeight

  const ctx = originalCanvas.getContext('2d')
  const maskCtx = maskCanvas.getContext('2d')
  if (!ctx || !maskCtx) return
  ctx.drawImage(originalImg, 0, 0, naturalWidth, naturalHeight)

  // 获取画布的像素数据
  const canvasData = ctx.getImageData(0, 0, originalCanvas.width, originalCanvas.height)
  const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)
  // 遍历像素数据，查找与悬浮点颜色相同的像素
  for (let pixelIndex = 0; pixelIndex < canvasData.data.length; pixelIndex += 4) {
    const [r, g, b, a] = maskData.data.slice(pixelIndex, pixelIndex + 4)

    // 蒙版中没有涂上的区域清空像素
    if (r === 0 && g === 0 && b === 0 && a === 0) {
      canvasData.data[pixelIndex] = 0
      canvasData.data[pixelIndex + 1] = 0
      canvasData.data[pixelIndex + 2] = 0
      canvasData.data[pixelIndex + 3] = 0
    } else {
      // canvasData.data[pixelIndex] = 0
      // canvasData.data[pixelIndex + 1] = 0
      // canvasData.data[pixelIndex + 2] = 0
      // canvasData.data[pixelIndex + 3] = 0
    }
  }

  // 将修改后的像素数据绘制回画布
  ctx.putImageData(canvasData, 0, 0)
  return originalCanvas.toDataURL()
}
