/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-10 20:29:04
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-04-26 11:28:51
 * @FilePath: \webpackProject\src\App\Dashboard\ButtonLink.tsx
 * @Description: xiangshangzhi写的文件
 *
 */
import { useNavigate } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import { LOGIN, APP, GROUP, ABOUT, HOOKS } from 'routes/constant'

function ButtonLink() {
  const navgate = useNavigate()
  return (
    <div>
      <Card>
        <h3>按钮点击事件跳转</h3>
        <Space>
          <Button
            type='primary'
            onClick={() => {
              navgate(ABOUT)
            }}>
            about
          </Button>
          <Button
            onClick={() => {
              navgate(GROUP)
            }}>
            group
          </Button>
          <Button
            onClick={() => {
              navgate(HOOKS)
            }}>
            hooks
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default ButtonLink
