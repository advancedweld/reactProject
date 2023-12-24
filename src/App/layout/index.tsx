/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\index.tsx
 */

import Dashboard from 'App/Dashboard'
import AuthWrap from 'App/auth'
import Header from './header'

const Entry = () => {
  return (
    <>
      <Header />
      <AuthWrap>
        <Dashboard />
      </AuthWrap>
    </>
  )
}

export default Entry
