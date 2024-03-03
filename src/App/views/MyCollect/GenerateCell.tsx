import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import cx from 'classnames'
import style from './cell.module.css'

const numRows = 50
const numCols = 50
const intervalTime = 100 // 每隔1秒更新一次状态

function GenerateCell() {
  const [matrix, setMatrix] = useState<Array<boolean>[]>(() =>
    Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => !!(Math.random() > 0.5))),
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMatrix((prevMatrix) => getNextMatrix(prevMatrix))
    }, intervalTime)

    return () => clearInterval(intervalId) // 清除定时器，避免内存泄漏
  }, [])

  const getNextMatrix = (currentMatrix: Array<boolean>[]) => {
    return currentMatrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const liveNeighbors = countLiveNeighbors(currentMatrix, rowIndex, colIndex)

        // Apply Conway's Game of Life rules
        if (cell) {
          // Any live cell with fewer than two live neighbors dies (underpopulation)
          // Any live cell with more than three live neighbors dies (overpopulation)
          return liveNeighbors === 2 || liveNeighbors === 3
        } else {
          // Any dead cell with exactly three live neighbors becomes a live cell
          return liveNeighbors === 3
        }
      }),
    )
  }

  const countLiveNeighbors = (matrix: Array<boolean>[], rowIndex: number, colIndex: number) => {
    const rows = matrix.length
    const cols = matrix[0].length

    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]

    return offsets.reduce((count, [rowOffset, colOffset]) => {
      const neighborRow = rowIndex + rowOffset
      const neighborCol = colIndex + colOffset

      // Check if the neighbor is within the matrix boundaries
      if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
        count += matrix[neighborRow][neighborCol] ? 1 : 0
      }

      return count
    }, 0)
  }

  const resetMatrix = () => {
    setMatrix(Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => !!(Math.random() > 0.5))))
  }
  return (
    <>
      <div className={style.wrap}>
        <h1>元胞自动机</h1>
        <div>
          <Button onClick={() => resetMatrix()}>reset</Button>{' '}
        </div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={style.row}>
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={cx(style.cell, cell ? style.live : style.dead)}>
                {cell ? 'T' : 'F'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default GenerateCell
