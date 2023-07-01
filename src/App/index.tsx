/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: \webpackProject\src\App\index.tsx
 */

import Dashboard from 'App/Dashboard'
import AuthWrap from './auth'

function App() {
  const isLogin = false
  return (
    <div id='App'>
      <AuthWrap>
        <Dashboard />
      </AuthWrap>
    </div>
  )
}
export default App
