/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-06-02 11:22:18
 * @FilePath: \webpackProject\src\App\Dashboard\XMenu.tsx
 * @Description: xiangshangzhi写的文件
 *
 */

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import { routes } from 'routes'

type MenuItem = Required<MenuProps>['items'][number]

type Route = {
  path: string
  element: React.ReactNode
  label: string
  children?: Route[]
}
const getItem = (routes: Route[]): MenuItem[] => {
  return routes.map((route, index) => {
    const { path, label = 'label', children } = route
    return {
      key: index,
      path,
      children: children ? getItem(children) : undefined,
      label: <Link to={path}>{label}</Link>,
    }
  })
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const XMenu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Menu
      mode='inline'
      theme='dark'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256, height: '100%' }}
      // style={{ width: 256, minHeight: 700 }}

      items={getItem(routes)}
    />
  )
}

export default XMenu
