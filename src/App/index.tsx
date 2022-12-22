/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: /webpackProject/src/App/index.tsx
 */
import React, { useEffect } from 'react'

import Dashboard from 'App/Dashboard'
function App() {
  console.log('🚀 ~ file: index.tsx:5 ~ App ~ App', App)
  return (
    <div id='App'>
      <Dashboard />
      {/* <>{routeObj.component}</> */}
    </div>
  )
}

export default App
console.log('🚀 ~ file: index.tsx:14 ~ App', App)
