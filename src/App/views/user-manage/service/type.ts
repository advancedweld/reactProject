export type User = {
  userName: string
  password: string
  // @IsEmail()
  email: string
  createTime: string
  updateTime: string
  avatar: string
}

export type GetUsersResponse = {
  code: number

  data: {
    users: User[]
    totalCount: number
  }
  message: string
}
