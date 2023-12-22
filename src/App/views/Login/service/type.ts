export type User = {
  userName: string
  password: string
  email: string
}

export type UserRegisterResponse = {
  code: number
  message: string
  data: User
}
