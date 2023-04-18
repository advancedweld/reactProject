import React, { useEffect, useRef, useState } from 'react'

export function useDenounce<T>(value: T, delay: Number) {
  const timerRef = useRef<Number>()
  const [innerValue, setInnerValue] = useState<T>()

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setInnerValue(value)
    }, delay)
  }, [value])

  /* 组件卸载后清理计时器 */
  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )
  return innerValue
}

export default () => {
  const [count, setCount] = useState(0)
  const denouncedCount = useDenounce(count, 1000)
  return (
    <div>
      <p>{`count is ${count}`}</p>
      <p>{`denouncedCount is ${denouncedCount}`}</p>
      <button onClick={() => setCount(count + 1)}>count++</button>
    </div>
  )
}

// const renderConsole = (() => {
//   let count = 0
//   return () => {
//     count++
//     requestAnimationFrame(() => console.log('animationFram----', count))
//     requestIdleCallback((deadline) =>
//       console.log('idleCallback----', count, deadline.timeRemaining()),
//     )
//   }
// })()

// renderConsole()

// renderConsole()
