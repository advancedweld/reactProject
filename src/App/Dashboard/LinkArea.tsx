/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-10 20:32:41
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-26 18:19:20
 * @FilePath: \webpackProject\src\App\Dashboard\LinkArea.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import { useNavigate, Link } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import { LOGIN, APP, GROUP, ABOUT, HOOKS, COMPONENT } from 'routes/constant'

function LinkArea() {
  return (
    <>
      <Card
        style={{
          marginBottom: '24px',
        }}>
        <Space size={50}>
          <div>
            <h3>a标签</h3>
            <Space>
              <a href={ABOUT}> about</a>
              <a href={ABOUT} onClick={() => {}}>
                about11(preventdefault)
              </a>
              <a href={GROUP}> group</a>
            </Space>
          </div>

          <div>
            <h3>Link组件</h3>
            <Space>
              <Link to={APP}> 首页</Link>
              <Link to={GROUP}> group</Link>
              <Link to={GROUP} target='_blank'>
                about(_blank)
              </Link>
              <Link to={HOOKS}> hooks</Link>
              <Link to={COMPONENT}> 自定义组件</Link>
            </Space>
          </div>
        </Space>
      </Card>
    </>
  )
}

export default LinkArea
