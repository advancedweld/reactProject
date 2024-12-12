import React, { useEffect } from 'react'
import { Button } from 'antd'
import cx from 'classnames'
import style from './style.module.css'
import { genQueue, genNextPos, generateMap } from './utils'
// 生成一个 10x10 的二维数组，其中每个位置的值为随机数

// 定义行数和列数
const numRows = 30
const numCols = 40

const queueLength = 10

// 生成整个矩阵
const initMap = generateMap(numRows, numCols)
console.log('🚀 ~ initMap:', initMap)

const initQueue = genQueue(queueLength, numRows, numCols)
function Entry() {
  const [numMap, setNumMap] = React.useState(initMap)

  const [enabled, setEnabled] = React.useState(false)
  const [queue, setQueue] = React.useState(initQueue)
  const cellHandle = (rowIndex: number, colIndex: number) => {
    setQueue((pre) => {
      const newPos = genNextPos(pre, numRows, numCols)
      // 如果没有合适的下一个点位了，重置队列
      if (!newPos) return initQueue
      const newQue = [...pre, newPos]
      newQue.shift()
      return newQue
    })
  }

  useEffect(() => {
    console.log('@@@queue in render is ----', queue)
  }, [queue])
  const isInQueue = (rowIndex: number, colIndex: number, queue: number[][]) => {
    // console.log('🚀 ~ isInQueue ~ queue:', queue)
    return queue.some(([x, y]) => x === rowIndex && y === colIndex)
  }

  const genCnt = (row: number, col: number, queue: number[][]) => {
    const headNode = queue[0]
    const tailNode = queue[queue.length - 1]
    if (row === headNode[0] && col === headNode[1]) return 'H'
    else if (row === tailNode[0] && col === tailNode[1]) return 'T'
    else if (isInQueue(row, col, queue)) return 'Q'
    else return ''
  }

  useEffect(() => {
    let animationFrameId: number
    const move = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (enabled) {
          // 二倍速降速
          // if (Math.random() > 0.5) {
          //   cellHandle(0, 0)
          // }
          cellHandle(0, 0)
          move()
        }
      })
    }
    move()
    return () => cancelAnimationFrame(animationFrameId)
  }, [enabled])
  return (
    <>
      <div className={style.wrap}>
        <h1> 元素扩散111 </h1>
        <Button onClick={() => setEnabled((enabled) => !enabled)}>{enabled ? '暂停' : '开始'}</Button>
        <div className={style.cellWrap}>
          {numMap.map((row, rowIndex) => (
            // row
            <div className={style.row} key={rowIndex}>
              {row.map((cell, colIndex) => (
                // cell
                <div
                  className={cx(style.cell, isInQueue(rowIndex, colIndex, queue) ? style.live : style.dead)}
                  key={colIndex}
                  onClick={() => cellHandle(rowIndex, colIndex)}>
                  {genCnt(rowIndex, colIndex, queue)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Entry
