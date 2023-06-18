import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Space, message } from 'antd'
import { fetchRequest, fetchRequestNode } from './utils'
import { requestGpt } from './gptRequest'
import style from './style.module.css'

function NetRequest() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })

  return (
    <>
      <div className={style.wrap}>
        <Space>
          <Button type='primary' onClick={fetchRequest}>
            发起请求
          </Button>
          <Button type='primary' onClick={fetchRequestNode}>
            再来一个node请求sss
          </Button>
          <Button type='primary' onClick={requestGpt}>
            请求gpt
          </Button>
        </Space>
      </div>
    </>
  )
}

export default NetRequest
