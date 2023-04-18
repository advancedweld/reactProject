import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ButtonLink from './ButtonLink'
import LinkArea from './LinkArea'

import styles from './style.module.css'

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

      <div className={styles.wrap}>
        <Outlet />
      </div>

      {/* <h1> ============分界线=================</h1>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={route.component}></Route>
        ))}
      </Routes> */}
    </div>
  )
}

export default Dashboard
