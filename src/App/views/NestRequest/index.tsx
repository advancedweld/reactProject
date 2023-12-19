import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Table } from 'antd'

import { useQuery, useMutation } from '@tanstack/react-query'
import { getPhotos, createPhoto } from './service/api'
import style from './style.module.css'

function Login() {
  const location = useLocation()
  useEffect(() => {
    console.log('@@location in login is -----', location)
  })

  const { data: photosData, refetch, isLoading } = useQuery({ queryKey: ['photos/Getphotos'], queryFn: getPhotos, enabled: true })

  // Mutations
  const mutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      // Invalidate and refetch
      refetch()
    },
  })
  const handleCreatePhoto = () => {
    mutation.mutate({
      name: 'xiangshangzhi',
      totalPages: 100,
      description: 'this is a photo',
      filename: 'go with the wind',
      isPublished: true,
      views: 1000 * Math.random(),
    })
  }
  useEffect(() => {
    console.log('@@photosData in login is -----', photosData)
  })
  return (
    <>
      <div className={style.wrap}>
        <h1> nest request </h1>
      </div>

      <Table dataSource={photosData} columns={photosData?.map((item) => ({ title: item.name, dataIndex: item.name }))} />
      <Button onClick={handleCreatePhoto}>新建photo</Button>
      {/* <div className="xiang">
        <h1> login </h1>
      </div> */}
    </>
  )
}

export default Login
