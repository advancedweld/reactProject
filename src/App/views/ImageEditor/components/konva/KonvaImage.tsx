import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type Iprops = {
  url: string
  stageWidth: number
  stageHeight: number
}
export type ImagePosRef = {
  size: {
    width: number
    height: number
  }
  posX: number
}
const KonvaImage = React.forwardRef<ImagePosRef, Iprops>(({ url, stageWidth, stageHeight }, ref) => {
  const [image] = useImage(url)
  console.log('@@@@image', image)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (image) {
      // 计算等比例缩放的比例
      const scaleFactor = stageHeight / image.height
      setScale(scaleFactor)
    }
  }, [image])

  const posX = image ? (stageWidth - image.width * scale) / 2 : 0

  useImperativeHandle(ref, () => ({
    size: {
      width: image ? image.width * scale : 0,
      height: image ? stageHeight : 0,
    },
    posX,
  }))
  const handleImageClick = (evt: any) => {
    console.log('@@@@handleImageClick', evt)
  }
  return image ? (
    <Image
      onClick={handleImageClick}
      image={image}
      width={image.width * scale}
      height={stageHeight}
      x={posX}
      // filters={}
    />
  ) : null
})

export default KonvaImage
