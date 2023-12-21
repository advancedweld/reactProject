export function convertFile2Base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// 消除 window[callbackName] ts类型报错
interface CustomWindow extends Window {
  [key: string]: any // 定义window上可能存在的任意属性
}

declare const window: CustomWindow

export function jsonpRequest(url: string) {
  return new Promise((resolve, reject) => {
    try {
      // 创建一个随机的回调函数名
      const callbackName = 'jsonp_callback_' + Date.now()
      // 创建一个script标签
      const script = document.createElement('script')
      // 设置script标签的src属性，包含回调函数名和请求URL
      script.src = url + '&callback=' + callbackName
      // 插入script标签到页面，触发JSONP请求
      document.body.appendChild(script)
      // 定义全局回调函数
      window[callbackName] = function (data: any) {
        delete window[callbackName]
        document.body.removeChild(script)
        resolve(data)
      }
    } catch (err) {
      console.log('@@@@@@@@@@@jsonp error:', err)
      reject(err)
    }
  })
}

export function convertURL2Base64(fileURL: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert URL to base64'))
        }
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.onerror = function (error) {
      reject(error)
    }
    xhr.open('GET', fileURL)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

export function downloadFile(url: string, filename: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.href = blobUrl
      anchor.download = filename
      anchor.click()

      // 清理资源
      window.URL.revokeObjectURL(blobUrl)
      anchor.remove()
    })
    .catch((error) => {
      console.error('下载文件出错：', error)
    })
}
// const MAX_IMAGE_SIZE = 2048
const MAX_IMAGE_SIZE = 1024
/** 图片压缩 */
export function compressImage(imageBase64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 创建一个 Image 对象
    const img = new Image()
    // 允许跨域
    img.setAttribute('crossOrigin', 'anonymous')
    // 图片加载完成后执行转换逻辑
    img.onload = function () {
      // 创建一个 canvas 元素
      const canvas = document.createElement('canvas')
      // 缩放比例
      const scaleFactor = Math.min(MAX_IMAGE_SIZE / img.width, MAX_IMAGE_SIZE / img.height, 1)
      const _newWidth = scaleFactor * img.width
      const _newHeight = scaleFactor * img.height
      canvas.width = _newWidth
      canvas.height = _newHeight
      const ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0, _newWidth, _newHeight)
      // 将图片数据转换为 PNG 格式
      const pngData = canvas.toDataURL('image/png')

      resolve(pngData)
    }
    img.onerror = function () {
      reject(Error('Error loading in compressImage'))
    }
    img.src = imageBase64
  })
}
