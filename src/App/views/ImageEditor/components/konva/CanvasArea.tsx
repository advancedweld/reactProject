import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Select, Space } from 'antd'

// https://konvajs.org/docs/react/Intro.html
import { Layer, Rect, Circle, Stage as KonvaStage, Text, Line } from 'react-konva'

import KonvaImage, { ImagePosRef } from './KonvaImage'
import style from './style.module.css'

type Iprops = {
  imgUrl: string
}
type Line = {
  points: number[]
  tool: string
}
const CanvasArea: React.FC<Iprops> = ({ imgUrl }) => {
  // const stageRef = React.useRef<Konva.Stage>(null)
  const posRef = React.useRef<ImagePosRef>(null)
  const [tool, setTool] = React.useState('pen')
  const [enablePaint, setEnablePaint] = useState(false)
  const [lines, setLines] = React.useState<Line[]>([])
  const isDrawing = React.useRef(false)

  const history = React.useRef<Line[][]>([])
  const historyIndex = React.useRef(-1)

  const handleMouseDown = (e: any) => {
    if (!enablePaint) return
    /** 如果不在图片范围内就不画线 */
    if (!posRef.current) return

    const points = e.target.getStage().getPointerPosition()
    const { size, posX } = posRef.current || {}
    if (points.x < posX || points.x > posX + size.width) {
      return
    }
    isDrawing.current = true
    console.log('@@@@@newLinesmousedown', lines)
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
    const lastLine = lines[lines.length - 1]
    if (lastLine) {
      lastLine.points = lastLine.points.concat([point.x, point.y])
      const newLines = lines.slice(0, lines.length - 1).concat([lastLine])

      history.current = history.current.slice(0, historyIndex.current + 1).concat(newLines)
      historyIndex.current = history.current.length - 1
      console.log('@@@@@history', history.current)
      console.log('@@@@@newLines', newLines)
      setLines(newLines)
    }
  }
  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const handleUndo = () => {
    const index = historyIndex.current - 1
    console.log('@@@@@undo', index)
    if (index >= 0) {
      historyIndex.current = index
      setLines(history.current[index])
    }
  }
  const handleRedo = () => {
    const index = historyIndex.current + 1
    console.log('@@@@@redo', index)
    if (index < history.current.length) {
      historyIndex.current = index
      setLines(history.current[index])
    }
  }

  return (
    <div>
      <Space>
        <Select
          value={tool}
          onChange={(value) => {
            setTool(value)
          }}>
          <option value='pen'>Pen</option>
          <option value='eraser'>Eraser</option>
        </Select>
        <Checkbox checked={enablePaint} onChange={(e) => setEnablePaint(e.target.checked)}>
          enablePaint
        </Checkbox>
        <Button type='primary' onClick={() => setLines([])}>
          reset
        </Button>
        <Button onClick={handleUndo}>undo</Button>
        <Button onClick={handleRedo}>redo</Button>
      </Space>

      <div className={style.stageWrap}>
        <KonvaStage
          height={400}
          width={800}
          // ref={stageRef}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
          <Layer name='image-layer'>
            <Rect width={50} height={50} fill='red' />
            <Circle x={200} y={200} stroke='black' radius={50} />
            {imgUrl && (
              <>
                <KonvaImage url={imgUrl} stageWidth={800} stageHeight={400} ref={posRef} />
                <KonvaImage
                  url={imgUrl}
                  stageWidth={600}
                  stageHeight={400}
                  // ref={posRef}
                />
              </>
            )}
          </Layer>
          <Layer>
            {/* <Text text='Just start drawing' x={5} y={30} />
            <Text text='undo' x={5} y={50} onClick={handleUndo} />
            <Text text='redo' x={5} y={70} onClick={handleRedo} /> */}
            {lines?.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke='#df4b26'
                strokeWidth={5}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
                globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            ))}
          </Layer>
        </KonvaStage>
      </div>
    </div>
  )
}

export default CanvasArea
