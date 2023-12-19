import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from 'antd'

import axiosinstance from 'utils/request'

import style from './style.module.css'

function Login() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })
  const createPhoto = () => {
    axiosinstance
      .post('/photos/create', {
        // .post('http://localhost:3000/photos/create', {
        name: 'xiangshangzhi',
        age: 18,
        totalPages: 100,
        description: 'this is a photo',
        filename: 'go with the wind',
      })
      .then((res) => {
        console.log('res in createPhoto is -----', res)
      })
      .catch((err) => {
        console.log('err in createPhoto is -----', err)
      })
  }
  return (
    <>
      <div className={style.wrap}>
        <h1> nest request </h1>
      </div>

      <Button onClick={createPhoto}>新建photo</Button>
      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
