/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2024-07-25 10:25:15
 * @FilePath: \reactProject\src\App\components\lazy-image\index.tsx
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-08-12 15:43:58
 * 参考： https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry
 */
import React, { useEffect, useRef, useState } from 'react'
import originalImg from '@/App/views/image-sam/assets/originalImg.png'

import './style.less'

interface IProps {
  src?: string
}
const LazyImage = (props: IProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = useState(props.src || originalImg)
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.0, 0.5, 0.8, 1.0],
    })
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      console.log('@@@@IntersectionObserverEntry', entry.intersectionRatio)
      // 进入视口 isIntersecting表示是否进入视口
      // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry
      if (entry.isIntersecting) {
        if (entry.intersectionRatio > 0.8) {
          const img = entry.target as HTMLImageElement
          img.src = imgSrc
        } else {
          const img = entry.target as HTMLImageElement
          img.src = ''
        }
      }
    })
  }
  return (
    <div className='lazy-img-wrap'>
      <img ref={imgRef} className=''></img>
    </div>
  )
}

export default LazyImage
