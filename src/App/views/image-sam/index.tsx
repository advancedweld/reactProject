import { Modal, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import DragUpload from '@/App/components/dragUpload'
import MaskEditor from './MaskEditor'
import { samImages, samControlnetImages } from './service/api'
import { convertFile2Base64 } from '@/utils'

import originalImg from './assets/originalImg.png'
import segImg from './assets/random1.png'

interface IMaskEditModal {
  open: boolean
  onClose: () => void
  onConfirm: (mask: string) => void
  originImgFile: File
  // 蒙版图
  maskSrc?: string
}

const MaskEditModal: React.FC<IMaskEditModal> = ({ open, onClose, originImgFile, onConfirm }) => {
  // 分割后的色块图片
  const [segImgUrl, setSegImgUrl] = useState<string>()

  const getCanvasContentRef = useRef<any>(null)
  const bodyStyle: React.CSSProperties = {
    width: '850px',
    height: '642px',
    overflow: 'scroll',
    // border: '1px solid red',
  }

  const { mutate: controlSegMutate, isPending: controlSegLoading } = useMutation({
    mutationKey: ['apitest/samControlnetPretict'],
    mutationFn: samControlnetImages,
    onSuccess: (response) => {
      function parseBase64(sourceCode: string) {
        return `data:image/png;base64,${sourceCode}`
      }
      const ramdomSeg = parseBase64(response.data.random_seg)
      if (ramdomSeg) {
        setSegImgUrl(ramdomSeg)
      }
    },
    onError: (err) => {
      message.error('图像分割失败')
      console.log('@@@@@err======', err)
    },
  })

  useEffect(() => {
    // 根据原图拿到蒙版
    const samControlPredict = async () => {
      if (!originImgFile) return
      const img4sam = await convertFile2Base64(originImgFile)

      controlSegMutate({
        payload: {
          sam_model_name: 'sam_vit_l_0b3195.pth',
          input_image: img4sam,
          processor: 'random',
        },
        autosam_conf: {
          // 控制精细程度 默认为0， 越大越粗糙
          // min_mask_region_area: 200,
        },
      })
    }
    // samControlPredict()
    setSegImgUrl(segImg)
  }, [originImgFile])

  const onModalConfirm = () => {
    const base64Mask = getCanvasContentRef.current.getCanvasContent?.()
    onConfirm(base64Mask)
  }
  return (
    <Modal
      open={open}
      onCancel={onClose}
      styles={{
        body: bodyStyle,
      }}
      width={930}
      onOk={onModalConfirm}>
      <MaskEditor originImgSrc={URL.createObjectURL(originImgFile)} maskSrc={segImgUrl} ref={getCanvasContentRef} />
    </Modal>
  )
}

const Entry = () => {
  const [editrModalOpen, setEditModalOpen] = useState(false)
  const [initImage, setInitImage] = useState<File | null>(null)

  useEffect(() => {
    // 使用 fetch 加载导入的图片并将其转换为 File 对象
    fetch(originalImg)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'initialImage.png', { type: blob.type })
        setInitImage(file)
      })
      .catch((error) => {
        console.error('Error loading initial image:', error)
      })
  }, [])

  return (
    <div>
      <div>
        <DragUpload
          onChange={(file) => {
            console.log('🚀 ~ Entry ~ file:', file)
            if (!file) return
            setInitImage(file)
          }}
        />
        <button onClick={() => setEditModalOpen(true)}>编辑</button>
      </div>
      <div>
        {initImage && (
          <MaskEditModal
            open={editrModalOpen}
            onClose={() => setEditModalOpen(false)}
            originImgFile={initImage}
            onConfirm={(mask) => {
              setEditModalOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Entry
