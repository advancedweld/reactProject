import React, { useEffect, useRef } from 'react'

type noop = (...args: any[]) => any

export function useThrottleFn<T extends noop>(func: T, delay = 1000) {
  const timerRef = useRef<any>()

  const fnRef = useRef(func)
  fnRef.current = func

  /* 组件卸载后清理计时器 */
  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )
  return React.useMemo(
    () =>
      (...args: any[]) => {
        if (!timerRef.current) {
          /* 立即执行 */
          fnRef.current?.(...args)
          timerRef.current = setTimeout(() => {
            /* 延迟执行 */
            // fnRef.current?.(...args)
            timerRef.current = null
          }, delay)
        }
      },
    [],
  )
}
