import { useNavigate, Link } from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import routes from '../routes'

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
              <a href='/about'> about</a>
              <a href='/about' onClick={() => {}}>
                about11(preventdefault)
              </a>
              <a href='/group'> group</a>
            </Space>
          </div>

          <div>
            <h3>Link组件</h3>
            <Space>
              <Link to='/'> 首页</Link>
              <Link to='/group'> group</Link>
              <Link to='/about' target='_blank'>
                about(_blank新开页面)
              </Link>
              <Link to='/hooks'> hooks</Link>
            </Space>
          </div>
        </Space>
      </Card>
    </>
  )
}

export default LinkArea
