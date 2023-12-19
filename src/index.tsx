/*
 * @Author: xiangshangzhi xiangshangzhi@xtfer.com
 * @Date: 2022-07-20 12:55:04
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-19 12:22:11
 * @FilePath: \reactProject\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack的入口文件：src/index.tsx

import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from 'routes'
import './index.less'
import { Eagle } from 'App/monitoring'

const eagle = new Eagle({ piggyName: 'lihuahah', interval: 3000, monitorRequest: true })
// eagle.startMonitoring()

function AppCotainer() {
  return (
    <div className='root'>
      <RouterProvider router={router} />
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<AppCotainer />)
setTimeout(() => {
  console.log('@@@unmountComponent')
  // root.unmount()
}, 10000)

// ReactDOM.render(<AppCotainer />, document.getElementById('root'))
