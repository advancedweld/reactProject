import request from 'utils/request'
import { Photo, User } from './type'

// 获取验证码
export const createPhoto: (params: Photo) => Promise<string> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/photos/create', params, { timeout: 0 })

export const updatePhoto: (params: Photo) => Promise<string> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/photos/update', params, { timeout: 0 })
// 获取账户信息
export const getPhotos: () => Promise<Photo[]> = () => request.get('/photos')
