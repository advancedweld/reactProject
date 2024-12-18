import {
  MonitoringCache,
  startFpsMonitor,
  collectPerformanceData,
  modifyHistory,
  sendDataToServer,
  monitorHttpRequest,
  stopMonitorHttpRequest,
} from './util'

type EagleOption = {
  piggyName: string
  interval: number
  // 上报地址
  monitorApi: string
  // 是否监控网络请求
  monitorRequest?: boolean
}

console.log('@@eagle is watching!')

class Eagle {
  name?: string = 'eagle'
  // 不需要配置的参数直接类型定义的时候给初始值，不需要在构造函数里处理

  version = '1.0.0'

  // 非空断言
  monitorApi!: string

  monitorRequest?: boolean

  interval?: NodeJS.Timeout | null // NodeJS.Timeout 用于存储 setInterval 的返回值

  private static instance: Eagle | null = null // 私有静态属性存储实例

  private cache: MonitoringCache = new MonitoringCache()

  constructor(options: EagleOption) {
    // 单例模式，new 创建返回同一个实例
    if (Eagle.instance) {
      // eslint-disable-next-line no-constructor-return
      return Eagle.instance
    }
    this.name = options.piggyName
    this.interval = null
    this.monitorRequest = options.monitorRequest
    this.monitorApi = options.monitorApi || ''
    Eagle.instance = this
  }

  modifyName(name: string) {
    this.name = name
  }

  startMonitoring() {
    // 根据配置启动网络请求监控
    if (this.monitorRequest) {
      monitorHttpRequest(this.cache)
    }
    // fpsMonitor
    startFpsMonitor(this.cache)
    collectPerformanceData(this.cache)

    modifyHistory()
    // 数据上报 从缓存拿到数据，发送给服务器
    this.interval = setInterval(() => {
      const data = this.cache.getAllData()
      this.uploadData(data)
      // 发送之后清空缓存
      // this.cache.clearData()
      console.log('@@@cache', data)
    }, 5000) // 每5秒收集一次数据并发送到服务器
  }

  stopMonitoring() {
    // 停止上报
    if (this.interval) {
      clearInterval(this.interval)
    }
    // 恢复原生fetch和ajax
    stopMonitorHttpRequest()
  }

  uploadData(data: any) {
    // return
    // sendDataToServer(data)
    sendDataToServer(data, this.monitorApi, () => this.cache.clearData())
  }

  static getInstance() {
    // if (!Eagle.instance) {
    //   Eagle.instance = new Eagle()
    // }
    return Eagle.instance
  }
}

export { Eagle }
