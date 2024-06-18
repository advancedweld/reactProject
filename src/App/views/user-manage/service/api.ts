import request from 'utils/request'
import { User, GetUsersResponse } from './type'

// 获取验证码
export const getAllUser: () => Promise<GetUsersResponse> = () => request.get('/api-x/user/all', { timeout: 0 })

export const deleteUser: (params: { userId: string }) => Promise<void> = (params) => request.post('/api-x/user/delete', params)

export const fetchUserDetail: (params: { userId: string }) => Promise<void> = (params) => request.post('/api-x/user/detail', params)
