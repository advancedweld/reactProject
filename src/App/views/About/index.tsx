import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { useLocation, useNavigate, unstable_HistoryRouter as useHistory, useNavigation, useBlocker } from 'react-router-dom'
import style from './style.module.css'

function About(props) {
  console.log('🚀 ~ file: index.tsx:13 ~ About ~ props:', props)

  const location = useLocation()
  const nav = useNavigate()
  // const history = useHistory()
  useEffect(() => {
    console.log('@@location in login is -----', location)
    console.log('@@nav in login is -----', nav)
  })

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
    </>
  )
}

export default About
