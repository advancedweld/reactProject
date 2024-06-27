import axios from 'axios'
import Cookies from 'js-cookie'

/* 生产环境API地址 */
const API_GATEWAY_PRO = ''

const IS_PROD = process.env.NODE_ENV === 'production'

// axios 默认配置
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 存储路由跳转时，需要cancel的接口
const instance = axios.create({
  // withCredentials: true,
  /* 超时时间10s */
  timeout: 1000 * 10,
  // baseURL: IS_PROD ? API_GATEWAY_PRO : '',
  /* 自定义header */
  headers: {
    'customer-header': 'customer-header',
  },
})

/**
 * 请求拦截
 */
instance.interceptors.request.use((config: any) => {
  /* 设置cookie */
  const cookie = Cookies.get()
  Cookies.remove('myCustomContent')
  Cookies.set('token', 'myCustomContent')

  // config.headers.Authorization = 'token = mynametoken'

  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * 结果拦截
 */
instance.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error?.response?.data)
  },
)

export default instance
