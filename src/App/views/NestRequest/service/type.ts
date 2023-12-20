export type Photo = {
  id?: number

  name: string

  totalPages: number

  description: string

  filename: string

  views: number

  isPublished: boolean

  user?: User
}

export type User = {
  id: number

  firstName: string

  lastName: string

  isActive: boolean

  photos: Photo[]
}

export type PageParams = {
  pageNo: number

  pageSize: number
}
