import request from 'utils/request'
import { Photo, User, PageParams, PhotosResponse } from './type'

// 获取验证码
export const createPhoto: (params: Photo) => Promise<string> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/photos/create', params, { timeout: 0 })

export const updatePhoto: (params: Photo) => Promise<string> = (params) =>
  // request.post('/user/getCode', { phone })
  request.post('/api-x/photos/update', params, { timeout: 0 })
// 获取账户信息
export const requestPhotos: (pages: PageParams) => Promise<PhotosResponse> = (params) =>
  request.get(`/api-x/photos?pageNo=${params.pageNo}&pageSize=${params.pageSize}`)
// request.get(`/api-x/author`)
