import React, { useEffect } from 'react'
// https://konvajs.org/docs/react/Intro.html
import {
  Layer,
  Rect,
  Circle,
  Stage as KonvaStage,
  Text,
  Line,
} from 'react-konva'
import Konva from 'konva'

import KonvaImage, { ImagePosRef } from './KonvaImage'
import style from '../style.module.css'

type Iprops = {
  imgUrl: string
}
type Line = {
  points: number[]
  tool: string
}
const CanvasArea: React.FC<Iprops> = ({ imgUrl }) => {
  const stageRef = React.useRef<Konva.Stage>(null)
  const posRef = React.useRef<ImagePosRef>(null)
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState<Line[]>([])
  const isDrawing = React.useRef(false)

  const handleMouseDown = (e: any) => {
    const points = e.target.getStage().getPointerPosition()
    /** 如果不在图片范围内就不画线 */
    if (!posRef.current) return
    const { size, posX } = posRef.current || {}
    if (points.x < posX || points.x > posX + size.width) {
      return
    }
    isDrawing.current = true
    setLines([...lines, { tool, points: [points.x, points.y] }])
  }
  const handleMouseMove = (e: any) => {
    /** 没用画线，找不到图片层，直接退出 */
    if (!isDrawing.current || !posRef.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const { size, posX } = posRef.current || {}
    if (point.x < posX || point.x > posX + size.width) {
      return
    }
    const lastLine = lines.pop()
    if (lastLine) {
      lastLine.points = lastLine.points.concat([point.x, point.y])
      const newLines = [...lines, lastLine]
      setLines(newLines)
    }
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  useEffect(() => {
    console.log('@@@@@line', lines)
  }, [lines])

  useEffect(() => {
    console.log('@@@@@posRef.current', posRef.current)
  }, [posRef.current])
  return (
    <div className={style.stageWrap}>
      <KonvaStage
        height={400}
        width={800}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}>
        <Layer name='image-layer'>
          <Rect width={50} height={50} fill='red' />
          <Circle x={200} y={200} stroke='black' radius={50} />
          {imgUrl && (
            <KonvaImage
              url={imgUrl}
              stageWidth={800}
              stageHeight={400}
              ref={posRef}
            />
          )}
        </Layer>
        <Layer>
          <Text text='Just start drawing' x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#df4b26'
              strokeWidth={5}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </KonvaStage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}>
        <option value='pen'>Pen</option>
        <option value='eraser'>Eraser</option>
      </select>
    </div>
  )
}

export default CanvasArea
