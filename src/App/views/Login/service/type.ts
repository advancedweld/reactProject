export type User = {
  userName: string
  password: string
  email: string
  access_token: string
}

export type UserRegisterResponse = {
  code: number
  message: string
  data: User
}

export type UserLoginResponse = UserRegisterResponse
