import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'

import style from './style.module.css'

interface IDragUpload {
  file?: File
  onChange: (file?: File) => void
}
function DragUpload(props: IDragUpload) {
  const [imgFlie, setImgFile] = React.useState<File | undefined>(props.file)

  const uploadRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    props.onChange(imgFlie)
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
    if (droppedFiles.length > 0) {
      setImgFile(droppedFiles[0])
    }
  }
  return (
    <>
      <div className={style.dragWrap}>
        <div>
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
          {imgFlie ? (
            <div>
              <div>
                <Button
                  onClick={() => {
                    setImgFile(undefined)
                  }}>
                  清除图片
                </Button>
              </div>

              <img className={style.imgPreview} src={URL.createObjectURL(imgFlie)} />
            </div>
          ) : (
            <div className={style.uploadWrap} onClick={handleUpload} onDragOver={handleDragover} onDrop={handleDrop}>
              上传图片
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DragUpload
