import React, { useEffect } from 'react'
import { Button, Space, Table, message, Drawer } from 'antd'
import type { TableProps } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { getAllUser, deleteUser, fetchUserDetail } from './service/api'
import { User } from './service/type'
import styles from './style.module.css'

const Entry = () => {
  const [currentUserId, setCurrentUserId] = React.useState<string | undefined>()
  const [open, setOpen] = React.useState<boolean>(false)
  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['users/getUsers'],
    queryFn: () => getAllUser(),
    enabled: true,
    select: (respose) => respose.data,
  })

  const { data: userDetailData, isLoading: isDetailLoading } = useQuery({
    queryKey: ['users/getUserDetail', currentUserId],
    queryFn: () => fetchUserDetail({ userId: currentUserId as string }),
    enabled: !!currentUserId,
  })

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success('删除成功')
      refetch()
    },
  })
  const columns: TableProps<User>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type='link' disabled={record.role === 'root'} onClick={() => handleDeleteUser(record.userId)}>
            删除
          </Button>
          <Button type='link' disabled={record.role === 'root'} onClick={() => openDetailDrawer(record.userId)}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ]

  const handleDeleteUser = (userId: string) => {
    mutate({ userId })
  }
  const openDetailDrawer = (userId: string) => {
    console.log('userId', userId)
    setOpen(true)
    setCurrentUserId(userId)
  }
  return (
    <>
      <div className={styles.wrap}>
        <Link to='/home'>返回首页</Link>
        <h1>用户管理</h1>
        <Table columns={columns} dataSource={userData?.users} bordered />
      </div>

      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement='right'
        open={open}
        loading={isDetailLoading}
        onClose={() => setOpen(false)}>
        {userDetailData?.data &&
          Object.entries(userDetailData.data).map(([key, value]) => {
            return (
              <div key={key}>
                <strong>{key}:</strong>
                {value}
              </div>
            )
          })}
      </Drawer>
    </>
  )
}

export default Entry
