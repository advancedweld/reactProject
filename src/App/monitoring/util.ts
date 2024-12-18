type Fps = {
  // 帧数
  value: number
  url: string
  timeStamp: number
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
type Performance = {
  // 页面加载性能指标
  networkDelay: any[]
  // 接口请求延时
  apiLatency: any[]
  fps: Fps[]
  error: any[]
}

type PerformanceKeys = keyof Performance

/** 缓存数据类 */
const MAX_CACHE_SIZE = 100

export class MonitoringCache {
  private data: Performance = {
    networkDelay: [],
    apiLatency: [],
    fps: [],
    error: [],
  }

  addData<T extends PerformanceKeys>(type: T, data: Performance[T][number]): void {
    const curData = this.data[type] || []

    // 如果当前数据已达到最大缓存大小，则删除最旧的元素
    if (curData.length === MAX_CACHE_SIZE) {
      this.data[type].shift()
    }

    // 向对应类型的数组中添加数据
    this.data[type].push(data)
  }

  clearData() {
    this.data = {
      networkDelay: [],
      apiLatency: [],
      fps: [],
      error: [],
    }
  }

  getAllData() {
    return this.data
  }

  // 可以根据需求添加其他功能，比如定时上报、本地存储等
}

/** 发送监测数据到后台 */
const sendDataToServerWithFetch = (data: Performance, monitorApi: string) => {
  return fetch(monitorApi, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const sendDataToServer = (data: Performance, monitorApi: string, onSucess: () => void, retry = 3) => {
  if (!retry) return
  // 不支持sendbeacon，用fetch
  // todo  数据上报成功后需要清空缓存
  if (!navigator.sendBeacon) {
    sendDataToServerWithFetch(data, monitorApi)
      .then((res) => {
        console.log('@@@@@sendDataToServer', res)
        onSucess()
      })
      .catch((error) => {
        console.error('Error sending data:', error)
        sendDataToServer(data, monitorApi, onSucess, retry - 1)
      })
  } else {
    const success = navigator.sendBeacon(monitorApi, JSON.stringify(data))
    onSucess()
    console.log('@@@@@sendDataToServer', success)
    if (!success) {
      console.log('Failed to send data to server retry', retry)
      sendDataToServer(data, monitorApi, onSucess, retry - 1)
    }
  }
}

/** 监测fps，根据每秒帧数得出fps */
export const startFpsMonitor = (cache: MonitoringCache) => {
  let frameCount = 0
  let timeStamp = Date.now()

  const monitor = () => {
    window.requestAnimationFrame(() => {
      const gap = Date.now() - timeStamp
      frameCount += 1
      // 统计一秒内的fps
      if (gap > 1000) {
        const fpsData = {
          value: frameCount,
          url: window.location.href,
          timeStamp: Date.now(),
        }
        if (frameCount < 45) {
          cache.addData('fps', fpsData)
        }
        frameCount = 0
        timeStamp = Date.now()
      }
      monitor()
    })
  }
  window.requestAnimationFrame(monitor)
}

/** 修改原生ajax */
const originalOpen = XMLHttpRequest.prototype.open
const originalSend = XMLHttpRequest.prototype.send
function monitorAjax(cache: MonitoringCache) {
  // open的时候拿到请求url，并记录开始请求时间戳
  XMLHttpRequest.prototype.open = function (method: string, url: string, ...args: any[]) {
    // @ts-ignore
    this._startTime = performance.now()
    // @ts-ignore
    this._url = url
    // @ts-ignore
    return originalOpen.call(this, method, url, ...args)
  }

  XMLHttpRequest.prototype.send = function (...args: any[]) {
    // eslint-disable-next-line
    const self = this
    this.addEventListener('load', function () {
      const endTime = performance.now()
      // @ts-ignore
      const latency = endTime - self._startTime
      const latencyInfo = {
        // @ts-ignore
        url: self._url,
        latency,
      }
      cache.addData('apiLatency', latencyInfo)
    })
    // @ts-ignore
    return originalSend.apply(this, args)
  }
}
function reserveAjaxRequest() {
  XMLHttpRequest.prototype.open = originalOpen || XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.send = originalSend || XMLHttpRequest.prototype.send
}

/** 修改原生fetch */
const originalFetch = window.fetch

function monitorFetch(cache: MonitoringCache) {
  window.fetch = function (...args: any[]) {
    const startTime = performance.now()
    const url = args[0] // 第一个参数是请求的 URL
    return (
      originalFetch
        // @ts-ignore
        .apply(this, args)
        .then((response) => {
          const endTime = performance.now()
          const latency = endTime - startTime
          const latencyInfo = {
            url,
            latency,
          }
          cache.addData('apiLatency', latencyInfo)
          return response
        })
        .catch((error) => {
          console.error('Error fetching API:', error)
          const latencyInfo = {
            url,
            latency: error,
          }
          cache.addData('apiLatency', latencyInfo)
          throw error
        })
    )
  }
}
function reserveFetch() {
  window.fetch = originalFetch || window.fetch
}
// 开启网络请求监测
export function monitorHttpRequest(cache: MonitoringCache) {
  monitorFetch(cache)
  monitorAjax(cache)
}
// 停止网络请求监测，恢复原生fetch和ajax
export function stopMonitorHttpRequest() {
  reserveAjaxRequest()
  reserveFetch()
}
export function collectPerformanceData(cache: MonitoringCache) {
  const paint: Record<string, number> = {}
  // fcp, fp
  // https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`The time to ${entry.name} was ${entry.startTime} milliseconds.`)
      paint[entry.name] = entry.startTime
      // Logs "The time to first-paint was 386.7999999523163 milliseconds."
      // Logs "The time to first-contentful-paint was 400.6999999284744 milliseconds."
    })
  })
  observer.observe({ type: 'paint', buffered: true })

  // lcp
  // https://juejin.cn/post/7143201009781702687?searchId=202401231359379DDEBE41E067686E8755
  const observer1 = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lcpEntry = entries.find((entry) => entry.entryType === 'largest-contentful-paint')

    if (lcpEntry) {
      const lcpTime = lcpEntry.startTime
      // eslint-disable-next-line dot-notation
      paint['lcp'] = lcpTime
      console.log('LCP:', lcpTime, 'ms')
      observer.disconnect()
    }
  })

  observer1.observe({ type: 'largest-contentful-paint', buffered: true })

  const observerTTI = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    console.log('🚀 ~ observerTTI ~ entries:', entries)

    const ttiEntry = entries.find((entry) => entry.entryType === 'first-input')

    if (ttiEntry) {
      const ttiTime = ttiEntry.startTime
      console.log('TTI:', ttiTime, 'ms')
      observer.disconnect()
    }
  })

  observerTTI.observe({ type: 'first-input', buffered: true })

  // 收集页面性能数据的方法，可以收集页面加载时间、资源加载时间等
  // getEntries 和 getEntriesByType 拿到的数据是一样的
  const performanceData = performance.getEntries()[0]
  const performanceType = performance.getEntriesByType('navigation')[0]
  console.log('🚀 ~ collectPerformanceData ~ performanceType:', performanceType)

  cache.addData('networkDelay', {
    performanceData,
    performanceType,
    performancePaint: paint,
  })
}

export function modifyHistory() {
  const ip = window.location.host
  console.log('@@@ip===', ip)
  window.addEventListener('popstate', function (event) {
    console.log('popstate 事件触发了')
    // 处理路由变化的逻辑
  })

  const originlPushState = History.prototype.pushState
  History.prototype.pushState = function (...args) {
    console.log('@@@pushState', args)
    originlPushState.apply(this, args)
  }
}
