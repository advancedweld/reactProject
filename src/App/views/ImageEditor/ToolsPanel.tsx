import React, { useEffect, useRef } from 'react'
import { Button, Space, Form } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { convertFile2Base64 } from '@/utils'
import CanvasParamForm from './CanvasParamForm'
import { CanvasImage } from './type'

import styles from './index.module.css'

type Placeholder = <T>(arg: T) => T | string
const placeholder: Placeholder = (arg) => {
  return arg ?? '- -'
}
interface ICanvasToolsPanel {
  canvasImage?: CanvasImage
  setImageArrs: React.Dispatch<React.SetStateAction<CanvasImage[]>>
}
const CanvasToolsPanel: React.FC<ICanvasToolsPanel> = ({ canvasImage, setImageArrs }) => {
  const uploadRef = useRef<HTMLInputElement | null>(null)

  const [form] = Form.useForm()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      convertFile2Base64(file).then((data) => {
        setImageArrs((imageArr) => {
          const imageItem: CanvasImage = {
            id: uuidv4(),
            src: data,
            scale: { x: 1, y: 1 },
            x: 0,
            y: 0,
            brightness: 0,
            contrast: 0,
            opacity: 1,
            saturation: 0,
          }
          return [...imageArr, imageItem]
        })
        // 清空使得连续两次上传同一文件能正常触发
        e.target.value = ''
      })
    } else {
      console.log('上传失败')
    }
  }
  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current?.click()
    }
  }

  const handleDeleteItem = () => {
    setImageArrs((imageArr) => {
      console.log('@@@@@删除图片', imageArr)
      return imageArr.filter((item) => item.id !== canvasImage?.id)
    })
  }
  const handleFilp = (direction: 'x' | 'y') => {
    if (!canvasImage) return
    setImageArrs((imageArr) => {
      console.log('@@@@@翻转图片', imageArr)
      const filteredItem = imageArr.find((item) => item.id === canvasImage?.id) as CanvasImage
      const newItem =
        direction === 'x'
          ? {
              ...filteredItem,
              scale: { x: -filteredItem.scale.x, y: filteredItem.scale.y },
              // x: filteredItem.x + filteredItem.scale.x * (filteredItem?.width || 0),
            }
          : {
              ...filteredItem,
              scale: { x: filteredItem.scale.x, y: -filteredItem.scale.y },
              // y: filteredItem.y + filteredItem.scale.y * (filteredItem?.height || 0),
            }

      return imageArr.map((item) => (item.id === canvasImage?.id ? newItem : item))
    })
  }
  const handleFilpX = () => handleFilp('x')
  const handleFilpY = () => handleFilp('y')

  /** 表单项改变后即时更新图片 */
  const onFormFieldChange = () => {
    const formValues = form.getFieldsValue(true)
    setImageArrs((imageArr) => {
      const filteredItem = imageArr.find((item) => item.id === canvasImage?.id) as CanvasImage
      const newItem = {
        ...filteredItem,
        ...formValues,
      }
      return imageArr.map((item) => (item.id === canvasImage?.id ? newItem : item))
    })
  }
  return (
    <div className={styles.canvasToolsPanel}>
      {/* <h2>工具栏</h2> */}
      <div className={styles.blockTitle}>工作区</div>
      <div className={styles.operateArea}>
        {/* <p className={styles.ellipsis}>{`当前选中图片： ${placeholder(canvasImage?.id)}`}</p>
        <p className={styles.ellipsis}>{`坐标：x:${placeholder(canvasImage?.x)}  y:${placeholder(canvasImage?.y)}`}</p> */}
        <input ref={uploadRef} type='file' onChange={onFileChange} style={{ display: 'none' }} />
        <Space>
          <Button type='primary' onClick={handleUpload}>
            添加图片
          </Button>
          <Button onClick={handleDeleteItem}>删除图片</Button>
        </Space>
        <Space style={{ marginTop: '16px' }}>
          <Button onClick={handleFilpX}>水平翻转</Button>
          <Button onClick={handleFilpY}>垂直翻转</Button>
        </Space>
      </div>
      <CanvasParamForm form={form} onFormFieldChange={onFormFieldChange} initialValues={canvasImage} />
    </div>
  )
}

export default CanvasToolsPanel
