import { useNavigate } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import routes from '../routes'

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
              navgate('/about')
            }}>
            about
          </Button>
          <Button
            onClick={() => {
              navgate('/group')
            }}>
            group
          </Button>
          <Button
            onClick={() => {
              navgate('/group')
            }}>
            group11
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default ButtonLink
