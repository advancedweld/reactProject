import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import style from './style.module.css'

function Login() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })
  return (
    <>
      <div className={style.wrap}>
        <h1> group </h1>
      </div>

      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
