import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import {
  useLocation,
  unstable_useBlocker as useBlocker,
} from 'react-router-dom'
// import { Prompt } from 'react-router'
import style from './style.module.css'

function Login() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })

  const [isBlocking, setIsBlocking] = useState(true)

  const blocker = useBlocker(true)

  useEffect(() => {
    if (blocker.state === 'blocked') {
      Modal.confirm({
        title: '确认离开吗',
        onOk: () => {
          blocker.proceed?.()
        },
        onCancel: () => {
          blocker.reset?.()
        },
      })
    }
  }, [blocker])

  return (
    <>
      <div className={style.wrap}>
        <h1> about </h1>
      </div>
      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
