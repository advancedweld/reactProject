import React, { useState, useEffect, useRef } from 'react'
import { Button, Space } from 'antd'
import { convertFile2Base64, downloadFile } from '@/utils'
// import DragUpload from '@/App/components/upload'
import DragUpload from '@/App/components/dragUpload'

import styles from './index.module.css'

// 变换transformer用法 demo：  https://konvajs.org/docs/react/Transformer.html

interface IOperatePanel {
  exportImage: () => void
  setBgImage: (src?: string) => void
}
const OperatePanel: React.FC<IOperatePanel> = ({ exportImage, setBgImage }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={exportImage}>导出图片</Button>
        {/* <Button onClick={resetPos}>重置位置</Button> */}

        <DragUpload
          onChange={(file) => {
            if (file) {
              convertFile2Base64(file).then((data) => {
                setBgImage(data)
              })
            } else {
              setBgImage(undefined)
            }
          }}
        />
      </div>
    </>
  )
}

export default OperatePanel
