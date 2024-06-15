export type User = {
  userName: string
  password: string
  email: string
  accessToken: string
}

export type UserLogin = {
  userName: string
  password: string
}
export type UserRegisterResponse = {
  code: number
  message: string
  data: User
}

export type UserLoginResponse = UserRegisterResponse
