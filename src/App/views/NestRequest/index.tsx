import React, { useEffect } from 'react'

import { Button, Table, Space, Modal, Form, Input, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getPhotos, createPhoto, updatePhoto } from './service/api'
import { Photo } from './service/type'
import style from './style.module.css'

function Entry() {
  const [editorVisible, setEditorVisible] = React.useState(false)
  const [editorType, setEditorType] = React.useState<'create' | 'update'>('create')
  const [photoForm] = Form.useForm<Photo>()
  const { data: photosData, refetch, isLoading } = useQuery({ queryKey: ['photos/Getphotos'], queryFn: getPhotos, enabled: true })

  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      message.success('创建成功')
      refetch()
    },
  })

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: () => {
      message.success('更新成功')
      refetch()
    },
  })
  const handleCreatePhoto = () => {
    photoForm.setFieldsValue({
      name: 'xiangshangzhi',
      totalPages: 100,
      description: 'this is a photo',
      filename: 'go with the wind',
      isPublished: true,
      views: 1000 * Math.random(),
    })
    setEditorVisible(true)
    setEditorType('create')
  }

  const editPhoto = (record: Photo) => {
    console.log('@@editPhoto', record)
    photoForm.setFieldsValue(record)
    setEditorVisible(true)
    setEditorType('update')
  }

  const deletePhoto = (id?: number) => {
    if (!id) return
    console.log('@@deletePhoto', id)
  }
  const columns: ColumnsType<Photo> = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '相片名',
      key: 'filename',
      dataIndex: 'filename',
    },

    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
    },

    {
      title: '发布状态',
      key: 'isPublished',
      dataIndex: 'isPublished',
    },
    {
      title: '总页数',
      key: 'totalPages',
      dataIndex: 'totalPages',
    },
    {
      title: '浏览量',
      key: 'views',
      dataIndex: 'views',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => editPhoto(record)} type='link'>
            编辑
          </Button>
          <Button onClick={() => deletePhoto(record.id)} type='link'>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const onFinish = () => {
    photoForm.validateFields().then((values) => {
      console.log('@@onFinish', values)
      const photoId = values.id
      if (editorType === 'update' && photoId) {
        updatePhotoMutation.mutate({ ...values })
      } else {
        createPhotoMutation.mutate({ ...values })
      }
      setEditorVisible(false)
    })
  }
  return (
    <>
      <div className={style.wrap}>
        <div className={style.header}>
          <h1> nest request </h1>
          <Button onClick={handleCreatePhoto} type='primary'>
            新建photo
          </Button>
        </div>
      </div>

      <Table dataSource={photosData} columns={columns} pagination={{ pageSize: 5 }} loading={isLoading} rowKey={'id'} scroll={{ y: 400 }} />

      <Modal open={editorVisible} onCancel={() => setEditorVisible(false)} title={editorType === 'create' ? '新建相片' : '编辑相片'} onOk={onFinish}>
        <Form form={photoForm} name={'photoForm'} style={{ marginTop: '8px' }} labelCol={{ flex: '80px' }} labelAlign='left' autoComplete='off'>
          <Form.Item label='名称' name='id' hidden>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='名称' name='name' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='相片名' name='filename' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='描述' name='description' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='发布状态' name='isPublished' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='总页数' name='totalPages' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item label='浏览量' name='views' required>
            <Input style={{ height: '40px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Entry
