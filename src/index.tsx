/*
 * @Author: xiangshangzhi xiangshangzhi@xtfer.com
 * @Date: 2022-07-20 12:55:04
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-12-18 15:57:53
 * @FilePath: \reactProject\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack的入口文件：src/index.tsx

import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { router } from 'routes'
import './index.less'
import { Eagle } from 'App/monitoring'
import dayjs from 'dayjs'

dayjs.locale('zh-cn')

const isDEV = process.env.NODE_ENV === 'development'
// 数据上报的配置要修改
const eagle = new Eagle({
  piggyName: 'lihuahah',
  interval: 5000,
  monitorRequest: true,
  monitorApi: isDEV ? 'http://localhost:3000/api-x/stastics' : 'http://8.140.248.120:3000/api-x/stastics',
})
window.onload = () => {
  console.log('window.onload')
  eagle.startMonitoring()
}

const queryClient = new QueryClient()

function AppCotainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<AppCotainer />)
setTimeout(() => {
  // console.log('@@@unmountComponent')
  // root.unmount()
}, 10000)

// ReactDOM.render(<AppCotainer />, document.getElementById('root'))
