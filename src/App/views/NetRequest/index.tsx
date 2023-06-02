import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Space, message } from 'antd'
import style from './style.module.css'

function NetRequest() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })
  const fetchRequest = () => {
    console.log('@@fetchRequest in login is -----', location)
    message.info('发起请求----')
  }
  return (
    <>
      <div className={style.wrap}>
        <Space>
          <Button type='primary' onClick={fetchRequest}>
            发起请求
          </Button>
        </Space>
      </div>
    </>
  )
}

export default NetRequest
