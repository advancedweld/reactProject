/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-22 11:23:27
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2023-06-04 22:03:48
 * @FilePath: \webpackProject\src\App\views\HooksTestCom\useGetVideo.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import { useEffect, useRef } from 'react'
import { Button, Space, message } from 'antd'

/* 目前都是利用ref获取实例，然后利用实例上的srcObject属性展示视频
 * srcObject 属性并不是 <video> 元素的标准属性，而是在 JavaScript 中的 API 中使用的属性
 *
 */
const CameraPreviewRef = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  async function openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('无法获取摄像头权限:', error)
    }
  }

  const closeCamera = () => {
    message.info('@@@@@@closeCamera1111')

    const stream = videoRef.current?.srcObject as MediaStream
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  /* 组件卸载停止调用摄像头 */
  useEffect(() => closeCamera, [])
  return (
    <>
      <Space>
        <Button onClick={openCamera}>开启摄像头</Button>
        <Button onClick={closeCamera}>关闭摄像头</Button>
      </Space>
      <video ref={videoRef} controls autoPlay width={500} height={400}></video>
    </>
  )
}

export default CameraPreviewRef
// export default CameraPreview
