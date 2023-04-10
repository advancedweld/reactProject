import { useNavigate } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import routes from '../routes'

function ButtonLink() {
  const navgate = useNavigate()
  return (
    <div>
      <Card>
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
