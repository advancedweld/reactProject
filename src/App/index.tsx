/*
 * @Author: xiangshangzhi
 * @Date: 2022-12-19 13:01:28
 * @FilePath: \reactProject\src\App\index.tsx
 */

import Dashboard from 'App/Dashboard'
import { Eagle } from 'App/monitoring'
import AuthWrap from './auth'

const eagle = new Eagle({ piggyName: 'lihuahah', interval: 3000, monitorRequest: true })
eagle.startMonitoring()

eagle.startMonitoring()

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
