import request from 'utils/request'
import { User, UserLogin, UserRegisterResponse, UserLoginResponse } from './type'

// 用户登录
export const userLogin: (params: UserLogin) => Promise<UserLoginResponse> = (params) =>
  // request.post('/user/getCode', { phone })
  // request.post('/api-x/user/login', params, { timeout: 0 })
  request.post('/api-x/auth/login', params, { timeout: 0 })
// 用户注册
export const userRegister: (params: UserLogin) => Promise<UserRegisterResponse> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/user/register', params, { timeout: 0 })
