import React, { useState, useEffect, useRef } from 'react'
import { Stage as KonvaStage, Layer, Image as KonvaImage } from 'react-konva'
import Konva from 'konva'
import { convertFile2Base64, downloadFile } from '@/utils'
import ToolsPanel from './ToolsPanel'
import OperatePanel from './OperatePanel'
import DragImage, { BgImage } from './DragImage'
import { CanvasImage } from './type'

import styles from './index.module.css'

export const CANVAS_WIDTH = 600
export const CANVAS_HEIGHT = 600
// 变换transformer用法 demo：  https://konvajs.org/docs/react/Transformer.html

const ConvasEditor = () => {
  const [selectedId, setSelectId] = useState<string | null>(null)

  const stageRef = useRef<Konva.Stage | null>(null)
  const [bgImage, setBgImage] = useState<string>()

  /**
   *  https://konvajs.org/docs/react/zIndex.html
   *  根据state里的顺序来展示对应层级，要改变层级，只需改变数组里的先后顺序就行
   */
  const [imageArrs, setImageArrs] = useState<CanvasImage[]>([])

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectId(null)
    }
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const droppedFiles = e.dataTransfer.files?.[0]
    console.log('@@@@@@onDrop', droppedFiles)
    if (stageRef.current && droppedFiles) {
      stageRef.current?.setPointersPositions(e)
      const src = await convertFile2Base64(droppedFiles)
      setImageArrs([
        ...imageArrs,
        {
          id: src,
          ...stageRef.current?.getPointerPosition(),
          src,
          scale: { x: 1, y: 1 },
          x: 0,
          y: 0,
          brightness: 0,
          opacity: 1,
        },
      ])
    }
  }
  const exportImage = () => {
    setSelectId(null)
    // 放到定时器中，避免导出的图片中有选择框
    setTimeout(() => {
      if (stageRef.current) {
        const image = stageRef.current.toDataURL()
        downloadFile(image, `canvas_image${Date.now()}`)
      }
    }, 0)
  }

  const mouseDown = (id: string) => {
    setImageArrs((imageArrs) => {
      const selected = imageArrs.find((item) => item.id === id)
      const rest = imageArrs.filter((item) => item.id !== id)
      return selected ? [...rest, selected] : rest
    })
  }
  const resetPos = () => {
    if (imageArrs.length > 0) {
      setImageArrs((imageArr) => {
        return imageArr.map((item) => ({
          ...item,
          x: 0,
          y: 0,
        }))
      })
    }
  }

  const keyUp = (e: KeyboardEvent) => {
    if (e.key === 'Delete' && selectedId) {
      setImageArrs((imageArr) => {
        return imageArr.filter((item) => item.id !== selectedId)
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', keyUp)
    return () => {
      window.removeEventListener('keyup', keyUp)
    }
  }, [selectedId])
  // 图片拖拽/缩放结束时更新 imageArrs
  const onTransformChange = (newImage: CanvasImage) => {
    setImageArrs(imageArrs.map((item) => (item.id === newImage.id ? newImage : item)))
  }
  const selecteItem = imageArrs.find((item) => item.id === selectedId)
  return (
    <div className={styles.canvasEditorWrap}>
      <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className={styles.canvasContainer}>
        <KonvaStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onMouseDown={checkDeselect} ref={stageRef}>
          <Layer>
            {/* 背景图片 */}
            {bgImage && (
              <BgImage
                imageProps={{ id: bgImage, src: bgImage }}
                isSelected={false}
                // 点击背景图的时候把选中id置空就行了
                onSelect={() => setSelectId(null)}
              />
            )}

            {imageArrs.map((item) => (
              <DragImage
                imageProps={item}
                key={item.id}
                isSelected={item.id === selectedId}
                onTransformChange={onTransformChange}
                onSelect={() => {
                  setSelectId(item.id)
                }}
              />
            ))}
          </Layer>
        </KonvaStage>
        <div className={styles.operatePanelWrap}>
          <OperatePanel setBgImage={setBgImage} exportImage={exportImage} />
        </div>
      </div>

      <ToolsPanel canvasImage={selecteItem} setImageArrs={setImageArrs} />
    </div>
  )
}

export default ConvasEditor
