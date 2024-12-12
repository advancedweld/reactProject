// 生成一个 10x10 的二维数组，其中每个位置的值为随机数

// 生成一个单独的随机数
const generateRandomNumber = () => Math.random().toFixed(2)
// 生成每一行的随机数
const generateRow = (numCols: number) => {
  return new Array(numCols).fill(0).map(generateRandomNumber)
}
export const generateMap = (numRows: number, numCols: number) => {
  return new Array(numRows).fill(0).map(() => generateRow(numCols))
}

// 根据当前队列生成下一个点的坐标
export const genNextPos = (curQueue: number[][], maxRow: number, maxCol: number): number[] | undefined => {
  const curPos = curQueue[curQueue.length - 1]
  const [x, y] = curPos
  const up = [x, y - 1]
  const down = [x, y + 1]
  const left = [x - 1, y]
  const right = [x + 1, y]

  const _nextPosList = []
  // 是否超出边界
  if (y > 0) _nextPosList.push(up)
  if (y < maxRow - 1) _nextPosList.push(down)
  if (x > 0) _nextPosList.push(left)
  if (x < maxCol - 1) _nextPosList.push(right)

  let nextPosList = _nextPosList
  // 是否与队列里元素重合
  nextPosList = _nextPosList.filter(([x, y]) => !curQueue.some((pos) => pos[0] === x && pos[1] === y))
  // console.log('🚀 ~ genNextPos ~ nextPosList:', nextPosList)

  return nextPosList[Math.floor(Math.random() * nextPosList.length)]
}

export const genQueue = (queueLength: number, numRows: number, numCols: number) => {
  // 初始坐标
  const initPos = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numCols)]
  let initQueue: number[][] = [initPos]

  for (let i = 0; i < queueLength; i++) {
    const temQueue = initQueue.slice()
    // 随机生成下一个点的坐标
    const nextPos = genNextPos(temQueue, numRows, numCols)
    // 到达边界条件后， 重新生成
    if (!nextPos) {
      initQueue = genQueue(queueLength, numRows, numCols)
      return initQueue
    }
    initQueue = [...temQueue, nextPos]
  }
  return initQueue
}
