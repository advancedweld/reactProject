import React, { useEffect } from 'react'
import { Transformer, Image as KonvaImage } from 'react-konva'
import Konva from 'konva'
import useImage from 'use-image'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './index'
import { CanvasImage } from './type'

// 变换transformer用法 demo：  https://konvajs.org/docs/react/Transformer.html

type IImageProps = {
  imageProps: CanvasImage
  isSelected: boolean
  onSelect?: () => void
  onTransformChange?: (newImage: CanvasImage) => void
}

const DragImage: React.FC<IImageProps> = ({ imageProps, onSelect, isSelected, onTransformChange }) => {
  const { src, id } = imageProps
  const shapeRef = React.useRef<Konva.Image | null>(null)
  const trRef = React.useRef<Konva.Transformer | null>(null)

  useEffect(() => {
    if (isSelected && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current])
      trRef.current?.getLayer()?.batchDraw()
    }
  }, [isSelected])

  const [img] = useImage(src)

  useEffect(() => {
    // https://konvajs.org/docs/react/Filters.html
    if (img) {
      shapeRef.current?.cache()
      const width = shapeRef.current?.width()
      const height = shapeRef.current?.height()
      // default to 0  , -100-100
      const contrast = shapeRef.current?.contrast()
      // default to 0  , -1-1
      const brightness = shapeRef.current?.brightness()
      const alpha = shapeRef.current?.alpha()
      const opacity = shapeRef.current?.opacity()
      // const props = { contrast, brightness, alpha }
      onTransformChange?.({ ...imageProps, width, height })
    }
  }, [img])

  const dragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onTransformChange?.({ ...imageProps, x: e.target.x(), y: e.target.y() })
  }

  const transformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const scaleX = e.target.scaleX()
    const scaleY = e.target.scaleY()
    const rotate = e.target.rotation()
    onTransformChange?.({ ...imageProps, x: e.target.x(), y: e.target.y(), scale: { x: scaleX, y: scaleY }, rotation: rotate })
  }
  return (
    <>
      <KonvaImage
        key={id}
        ref={shapeRef}
        image={img}
        onMouseDown={onSelect}
        onDragEnd={dragEnd}
        onTransformEnd={transformEnd}
        draggable={true}
        {...imageProps}
        filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSV]}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

interface IBgImage {
  imageProps: Omit<CanvasImage, 'scale' | 'x' | 'y' | 'brightness'>
  isSelected: boolean
  onSelect?: () => void
  onTransformChange?: (newImage: CanvasImage) => void
}
export const BgImage: React.FC<IBgImage> = ({ imageProps, onSelect }) => {
  const [img] = useImage(imageProps.src)
  return <KonvaImage image={img} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onClick={onSelect} {...imageProps} />
}

export default DragImage
