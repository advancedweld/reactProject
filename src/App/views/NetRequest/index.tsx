import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Input, Space, message } from 'antd'
import { fetchRequest, fetchRequestNode } from './utils'
import { requestGpt } from './gptRequest'
import style from './style.module.css'

function NetRequest() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })

  const [requestStr, setRequestStr] = React.useState('')
  const [responseStr, setResponseStr] = React.useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestStr(e.target.value)
    console.log('@@@e.target.value is ----', e.target.value)
  }
  const onSendRequest = async () => {
    const response = await requestGpt(requestStr)
    console.log('@@@response is ----', response)
    const { data } = response
    const res = data.choices[0].text || ''
    setResponseStr((prev) => `${prev}${res}`)
    /* 清空请求框 */
    setRequestStr('')
  }
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
          {/* <Button type='primary' onClick={requestGpt}>
            请求gpt
          </Button> */}
        </Space>
        <div className={style.gptWrap}>
          <Input.TextArea
            value={responseStr}
            style={{ width: '100%', height: '300px' }}>
            文本域
          </Input.TextArea>
          <Space style={{ marginTop: '20px' }}>
            <Input.TextArea
              style={{ width: '360px' }}
              placeholder='欢迎提问'
              value={requestStr}
              onChange={onInputChange}></Input.TextArea>
            <Button type='primary' onClick={onSendRequest}>
              发送
            </Button>
          </Space>
        </div>
      </div>
    </>
  )
}

export default NetRequest
