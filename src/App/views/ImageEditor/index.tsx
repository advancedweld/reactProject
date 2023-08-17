import React, { useEffect } from 'react'
import { Button } from 'antd'
import CanvasArea from './components/CanvasArea'

import style from './style.module.css'

function ImageEditor() {
  const [imgFlie, setImgFile] = React.useState<File | undefined>()

  const url = React.useMemo(() => {
    if (imgFlie) {
      return URL.createObjectURL(imgFlie)
    }
  }, [imgFlie])

  return (
    <>
      <div className={style.wrap}>
        <div>
          <h1> 图片编辑</h1>
          <input
            type='file'
            onChange={(e) => {
              setImgFile(e.target.files?.[0])
            }}
          />
          {imgFlie && (
            <Button
              onClick={() => {
                setImgFile(undefined)
              }}>
              清除图片
            </Button>
          )}
        </div>

        <div className={style.canvasWrap}>
          {url && <CanvasArea imgUrl={url} />}
        </div>
      </div>
    </>
  )
}

export default ImageEditor
