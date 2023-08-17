import React, { useEffect, useState } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type Iprops = {
  url: string
  stageWidth: number
  stageHeight: number
}
const KonvaImage: React.FC<Iprops> = ({ url, stageWidth, stageHeight }) => {
  const [image] = useImage(url)
  const [scale, setScale] = useState(1)
  // "image" will be DOM image element or undefined
  useEffect(() => {
    if (image) {
      // 计算等比例缩放的比例
      const scaleFactor = stageHeight / image.height
      setScale(scaleFactor)
    }
  }, [image])

  const posX = image ? (stageWidth - image.width * scale) / 2 : 0
  // console.log('@@@@posX', posX)
  return image ? (
    <Image
      image={image}
      width={image.width * scale}
      height={stageHeight}
      x={posX}
    />
  ) : null
}

export default KonvaImage
