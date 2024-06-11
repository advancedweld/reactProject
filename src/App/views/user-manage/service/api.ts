import request from 'utils/request'
import { User, GetUsersResponse } from './type'

// 获取验证码
export const getAllUser: () => Promise<GetUsersResponse> = () =>
  // request.post('/user/getCode', { phone })
  request.get('/api-x/user/all', { timeout: 0 })

export const updatePhoto: (params: User) => Promise<GetUsersResponse> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/user/update', params, { timeout: 0 })
