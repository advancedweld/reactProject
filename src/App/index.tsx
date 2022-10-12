import React, { useEffect } from 'react'
import {
  useLocation,
  Routes,
  Route,
  RouteProps,
  Link,
  useNavigate,
} from 'react-router-dom'
// import { renderRoutes } from "react-router-config";
import routes from './routes'

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

      <div>
        <h1>a链接</h1>
        <a href='/about'> about11</a>
        <a href='/group'> group</a>
      </div>

      <div>
        <button
          onClick={() => {
            navgate('/about')
          }}>
          {' '}
          about
        </button>
        <button
          onClick={() => {
            navgate('/group')
          }}>
          {' '}
          group
        </button>
      </div>
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
