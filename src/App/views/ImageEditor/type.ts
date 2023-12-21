/*
 * @Author: xiangshangzhi
 * @Date: 2023-10-30 15:51:40
 * @FilePath: \ai-painting\src\pages\dashboard\components\canvasEditor\type.ts
 * @Description:
 */
export type CanvasImage = {
  src: string
  id: string
  x: number
  y: number
  scale: { x: number; y: number }
  width?: number
  height?: number
  // 对比度
  contrast?: number
  brightness: number
  opacity?: number
  rotation?: number
  saturation?: number
}
