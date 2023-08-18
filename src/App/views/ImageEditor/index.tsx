import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'
import CanvasArea from './components/CanvasArea'

import style from './style.module.css'

function ImageEditor() {
  const [imgFlie, setImgFile] = React.useState<File | undefined>()

  const uploadRef = useRef<HTMLInputElement | null>(null)
  const url = React.useMemo(() => {
    if (imgFlie) {
      return URL.createObjectURL(imgFlie)
    }
  }, [imgFlie])

  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current?.click()
    }
  }
  const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
    // dragover事件必须阻止默认事件，否则无法触发drop事件
    e.preventDefault()
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files
    console.log('@@@@droppedFiles', droppedFiles)
    if (droppedFiles.length > 0) {
      setImgFile(droppedFiles[0])
    }
  }
  return (
    <>
      <div className={style.wrap}>
        <div>
          <h1> 图片编辑</h1>
          <input
            ref={uploadRef}
            type='file'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImgFile(file)
              }
            }}
            style={{ display: 'none' }}
          />
          {imgFlie && (
            <Button
              onClick={() => {
                setImgFile(undefined)
              }}>
              清除图片
            </Button>
          )}
          <div
            className={style.uploadWrap}
            onClick={handleUpload}
            onDragOver={handleDragover}
            onDrop={handleDrop}>
            上传图片
          </div>
        </div>

        <div className={style.canvasWrap}>
          {url && <CanvasArea imgUrl={url} />}
        </div>
      </div>
    </>
  )
}

export default ImageEditor
