import request from 'utils/request'
import { User } from './type'

// 获取验证码
export const userLogin: (params: User) => Promise<string> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/auth/login', params, { timeout: 0 })
