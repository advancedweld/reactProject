import { useEffect } from 'react'
import {
  useLocation,
  Routes,
  Route,
  RouteProps,
  Link,
  useNavigate,
} from 'react-router-dom'
import { Button, Card, Space } from 'antd'
import routes from '../routes'

function App() {
  const location = useLocation()
  const navgate = useNavigate()
  const [routeObj] = routes
  useEffect(() => {
    console.log('location is -----', location)
  })

  return (
    <div className='App'>
      <h1> hello React </h1>
      <Link to='/group'> group11</Link>
      <Link to='/about'> about11</Link>

      <Card title='a标签1111'>
        <Space>
          <a href='/about'> about11</a>
          <a href='/about' onClick={() => {}}>
            about11(preventdefault)
          </a>
          <a href='/group'> group</a>
        </Space>
      </Card>

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
        </Space>
      </Card>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={route.component}></Route>
        ))}
      </Routes>

      {/* <>{routeObj.component}</> */}
    </div>
  )
}

export default App
