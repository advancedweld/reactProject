export type User = {
  userId: string
  userName: string
  password: string
  // @IsEmail()
  email: string
  createTime: string
  updateTime: string
  avatar: string
  role: 'root' | 'vip' | 'normal'
}

export type GetUsersResponse = {
  code: number

  data: {
    users: User[]
    totalCount: number
  }
  message: string
}
