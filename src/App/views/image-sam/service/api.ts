import request from 'utils/request'
import { AxiosResponse } from 'axios'

export type SamControlnetRequestParams = {
  payload: {
    sam_model_name?: 'sam_vit_h_4b8939.pth' | 'sam_vit_l_0b3195.pth'
    input_image: string
    processor: 'random'
  }
  autosam_conf: any
}
export type SamRequestParams = {
  sam_model_name: 'sam_vit_h_4b8939.pth' | 'sam_vit_l_0b3195.pth'
  input_image: string
  sam_positive_points: [number, number][] // 请替换为适当的类型，例如 [number, number][]
  sam_negative_points: any[] // 请替换为适当的类型，例如 [number, number][]
  dino_enabled?: boolean
  dino_model_name?: string
  dino_text_prompt?: string
  dino_box_threshold?: number
  dino_preview_checkbox?: boolean
  dino_preview_boxes_selection?: number[]
}

export type SamResponse = {
  // 返回的图片字符串，需要手动加base64前缀
  blended_images: string[]
  masked_images: string[]
  masks: string[]
  msg: string
}
export type SamControlnetResponse = {
  // 返回的图片字符串，需要手动加base64前缀
  blended_images: string
  // 黑白色块分割图片
  edit_anything_control: string
  // 彩色分割图片
  random_seg: string
  msg: string
}
export const samImages: (params: SamRequestParams) => Promise<AxiosResponse<SamResponse>> = (params) =>
  request.post('/sam/sam-predict', { ...params }, { timeout: 0 })

export const samControlnetImages: (params: SamControlnetRequestParams) => Promise<AxiosResponse<SamControlnetResponse>> = (params) =>
  request.post('/sam/controlnet-seg', { ...params }, { timeout: 0 })
