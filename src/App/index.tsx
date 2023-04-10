/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: /webpackProject/src/App/index.tsx
 */

import Dashboard from 'App/Dashboard'

function App() {
  return (
    <div id='App'>
      <Dashboard />
    </div>
  )
}
console.log('@@@@NODE_ENV', process.env.NODE_ENV)
console.log('@@@@@BASE_ENV', process.env.BASE_ENV)
console.log('🚀 ~ file: index.tsx:14 ~ App', App)
export default App
