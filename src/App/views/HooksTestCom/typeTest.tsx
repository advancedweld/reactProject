import Base from 'antd/es/typography/Base'

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type _Record<K extends keyof any, T> = {
  [P in K]: T
}

type _Exclude<T, U> = T extends U ? never : T

type _Extract<T, U> = T extends U ? T : never

type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type _ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any

type Base = {
  age: number
}

type Person = {
  age: number
  nick: string
  area: string
}

type Res = _Exclude<Base, Person> // Base  Base 不是 extends Person

type Res_ = _Exclude<Person, Base> // never  Person extends Base

type Res__ = _Exclude<'name' | 'age' | 'area', 'age'> // 'area'|'name'

type ResPick = _Pick<Person, 'age'> // { age: number }

// const is = Base extends Person ? true : false
