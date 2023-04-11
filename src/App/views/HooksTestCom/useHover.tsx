import React, { useEffect, useRef, useState, MutableRefObject } from 'react'
import { useHover } from 'ahooks'

/* 自己实现_useHover */
export function _useHover<T extends HTMLElement>(): [
  MutableRefObject<T>,
  boolean,
] {
  const ref = useRef<T>()
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    if (!ref.current) return

    const currentElement = ref.current
    const onHover = () => setIsHovering(true)
    const onBlur = () => setIsHovering(false)

    currentElement.addEventListener('mouseenter', onHover)
    currentElement.addEventListener('mouseleave', onBlur)

    return () => {
      /* removing the event listeners  */
      currentElement.removeEventListener('mouseenter', onHover)
      currentElement.removeEventListener('mouseenter', onBlur)
    }
  })

  return [ref, isHovering]
}

export default () => {
  const refAhooks = useRef(null)
  const isHoveringAhooks = useHover(refAhooks)

  const [ref, isHovering] = _useHover()

  return (
    <>
      <p ref={ref}>手动实现： {isHovering ? 'hovering' : 'leaveHover'}</p>
      <p ref={refAhooks}>
        ahooks： {isHoveringAhooks ? 'hovering' : 'leaveHover'}
      </p>
    </>
  )
}
