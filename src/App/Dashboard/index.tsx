import { useEffect } from 'react'
import {
  Outlet,
  useLocation,
  Routes,
  Route,
  RouteProps,
  Link,
  useNavigate,
} from 'react-router-dom'
import { Button, Card, Space } from 'antd'

import ButtonLink from './ButtonLink'
import LinkArea from './LinkArea'
import routes from '../routes'

function Dashboard() {
  const location = useLocation()

  useEffect(() => {
    console.log('location is -----', location)
  })

  return (
    <div className='Dashboard'>
      <h3> hello React </h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <LinkArea />
        <ButtonLink />
      </div>

      <Outlet />
      <h1> ============分界线=================</h1>
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

export default Dashboard
