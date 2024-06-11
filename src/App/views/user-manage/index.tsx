import React, { useEffect } from 'react'
import { Button, Table } from 'antd'
import type { TableProps } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { getAllUser, updatePhoto } from './service/api'
import { User } from './service/type'
import styles from './style.module.css'

const Entry = () => {
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
  const columns: TableProps<User>['columns'] = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
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
      title: '操作',
      key: 'action',
      render: (text, record) => <div>操作</div>,
    },
  ]

  return (
    <div className={styles.wrap}>
      <Link to='/home'>返回首页</Link>
      <h1>用户管理</h1>
      <Table columns={columns} dataSource={userData?.users} />
    </div>
  )
}

export default Entry
