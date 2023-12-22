import request from 'utils/request'
import { User, UserRegisterResponse, UserLoginResponse } from './type'

// 用户登录
export const userLogin: (params: User) => Promise<UserLoginResponse> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/user/login', params, { timeout: 0 })

// 用户注册
export const userRegister: (params: User) => Promise<UserRegisterResponse> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/user/register', params, { timeout: 0 })
