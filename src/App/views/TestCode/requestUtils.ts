import axios from 'axios'
import { RequestConfig } from '@/../types/interface/config'
import { getCookie, getStorage } from '@lhb/cache'
import { logout } from '@/common/utils/ways'
import { message as AntdMessage } from 'antd'
import { URL_REG } from '@lhb/regexp'
import { deepCopy, isDef } from '@lhb/func'

// MockUrl
const mockUrl = 'https://yapi.lanhanba.com/mock/'
// const baseUrl = '/api';

// 默认前缀加上
const applicationFlow = `/terra/api`
const applicationCheckSpot = `/nox`
const applicationMirage = `/mirage/api`
const applicationZeus = `/zeus-api/api`
// const applicationName = `/gateway`;
/**
 * 请求基础配置
 */
const baseConfig: any = {
  needCancel: true, // 是否需要在下次请求发生时，对之前的请求进行 abortControl
  isMock: false, // 是否mock方式
  isCheckSpot: false, // 是否是踩点应用的接口
  // isGateway: false,
  mockId: 297, // 其他后台mock的id
  mockSuffix: '', // mock地址后缀
  needHint: false, // 是否需要主动报错
  errorConfig: {
    needHint: false,
    duration: 3, // 报错后多久小时，秒
    showClose: false, // 是否显示关闭按钮，开启后报错弹窗将不会主动消失
  },
}

/**
 * 异常处理
 */
class ApiError extends Error {
  code: string
  constructor(err: { message?: string; msg?: string; code: string }) {
    const msg: string = err.message || err.msg || ''
    super(msg)
    Object.assign(this, err)
    this.code = err.code
  }
}

/**
 * 获取header
 * @param version 版本号
 * @param isPost 是否是 Post 请求
 */
export function getHeader(version = 1, isPost = false): any {
  // flowLoginToken-前置在需要选择企业的时候获取企业列表的时候header上需要带点击登录之后获取的token
  const apiKey = getCookie('flow_token')
  const apiKeyLogin = getStorage('flowLoginToken')
  const config = {
    Accept: `application/vnd.linhuiba.v${version}+json`,
    // Authorization: apiKey ? `Bearer ${apiKey}` : 'Bearer',
    clientKey: 1000110,
    ...((apiKey || apiKeyLogin) && { token: apiKey || apiKeyLogin }),
  }

  return isPost
    ? { ...config, ...{ 'Content-Type': 'application/json' } }
    : config
}

/**
 * 合并请求
 * @param extraConfig
 */
export function mergeConfig(extraConfig: any): RequestConfig {
  const _baseConfig = deepCopy(baseConfig)
  // 为了方便 第三个参数为boolean 值时可控制needHint值
  if (typeof extraConfig === 'boolean') {
    _baseConfig.errorConfig.needHint = extraConfig
    return _baseConfig
  } else if (extraConfig.needHint) {
    _baseConfig.errorConfig.needHint = extraConfig.needHint
  }
  return { ..._baseConfig, ...extraConfig }
}

/**
 * 返回配置后的请求URl
 */
export function getRequestUrl(
  serviceName: string,
  config: RequestConfig,
): string {
  if (URL_REG.test(serviceName)) return serviceName
  const { isMock, isCheckSpot, isMirage, isZeus } = config
  if (isMock) {
    return (
      `${mockUrl}${config.mockId || baseConfig.mockId}${
        config.mockSuffix || baseConfig.mockSuffix
      }` + serviceName
    )
  }
  let prefix = applicationFlow
  if (isCheckSpot) {
    // 踩点应用前缀
    prefix = applicationCheckSpot
  } else if (isMirage) {
    prefix = applicationMirage
  } else if (isZeus) {
    prefix = applicationZeus
  }
  // else if (isGateway) {
  //   prefix = applicationName;
  // }
  return `${prefix}${serviceName}`
}

/**
 * 错误的请求处理
 * @param err
 * @param config
 */
export function fail(err: any, config: RequestConfig, requestUrl): null {
  if (axios.isCancel(err)) {
    !requestUrl && console.log(123, err, config, requestUrl)
    throw new ApiError({
      code: 'cancel',
      msg: '您取消了请求',
    })
  }

  const needHint = config.errorConfig && config.errorConfig.needHint
  const duration = config.errorConfig && config.errorConfig.duration
  const showClose =
    (config.errorConfig && config.errorConfig.showClose) || false
  const errorOptions: any = {
    type: 'error',
    duration,
    closable: showClose,
  }
  if (err.response) {
    const {
      status,
      data: { message, errMsg },
    } = err.response
    switch (status) {
      case 400:
        errorOptions.content = errMsg || 'Bad Request'
        break
      case 401:
        errorOptions.content = '未登录'
        break
      case 403:
        errorOptions.content = '未授权'
        break
      case 404:
        errorOptions.content = '资源不存在'
        break
      case 422: // 表单错误
        errorOptions.content = message || errMsg
        break
      case 429:
        errorOptions.content = '休息一会儿，稍后回来'
        break
      case 500:
        errorOptions.content = '服务器出了小差~'
        break
      default:
        if (needHint) {
          errorOptions.content = message || errMsg
        }
        break
    }
    console.log('>>>>>', needHint)
    // 一些需要用户手动关闭的提示弹窗
    // 约定为420
    // 如，批量操作部分失败的情况
    if (errorOptions.content) {
      if (status === 401) {
        logout()
      } else {
        AntdMessage.open(errorOptions)
      }
    }
  }
  if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
    AntdMessage.error(`服务器响应超时`)
  }
  throw new ApiError(err)
}

/**
 * 成功请求处理
 * remark: 暂时未做处理，预留
 * @param res
 */
export function success(res: any, config: any) {
  const { data } = res
  if (config.isMock) {
    return data
  }
  if (isDef(data)) {
    return data
  } else {
    // AntdMessage.open({
    //   type: 'error',
    //   content: data.msg,
    // });
  }
  throw new ApiError(data)
}

/**
 * 获取 axios 请求配置
 * @param requestConfig
 * @param axiosConfig
 */
export function getAxiosConfig(
  requestConfig: RequestConfig,
  axiosConfig: any = {},
) {
  const { needCancel = true } = requestConfig
  // 需要cancel的时候，就加入cancelToken
  if (needCancel) {
    // axios会根据 cancelToken是否存在，进行打断。
    axiosConfig.cancelToken = {}
  }

  return axiosConfig
}
