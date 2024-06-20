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

export type UserDetailsersResponse = {
  code: number

  data: {
    userName: string
    // 返回的字段中不 包含password

    password: string

    email: string

    age: number

    gender: 'male' | 'female'

    role: string

    hobby: string

    createTime: Date

    updateTime: Date

    avatar: string
  }
  message: string
}
