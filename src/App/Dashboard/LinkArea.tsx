import { useNavigate, Link } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import routes from '../routes'

function LinkArea() {
  return (
    <>
      <Card title='链接跳转' style={{ marginBottom: '24px' }}>
        <h1>a标签</h1>
        <Space>
          <a href='/about'> about</a>
          <a href='/about' onClick={() => {}}>
            about11(preventdefault)
          </a>
          <a href='/group'> group</a>
        </Space>

        <h1>Link组件</h1>
        <Link to='/'> 首页</Link>
        <Link to='/group'> group</Link>
        <Link to='/about'> about</Link>
      </Card>
    </>
  )
}

export default LinkArea
