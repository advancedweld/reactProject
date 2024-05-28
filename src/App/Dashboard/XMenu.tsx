/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-03 19:13:51
 * @LastEditors: engineMaster xiangshangzhi@gmail.com
 * @LastEditTime: 2024-05-20 20:27:25
 * @FilePath: \reactProject\src\App\Dashboard\XMenu.tsx
 * @Description: xiangshangzhi写的文件
 *
 */

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import { baseRoutes } from 'routes'

type MenuItem = Required<MenuProps>['items'][number]

type Route = {
  path: string
  element: React.ReactNode
  label: string
  children?: Route[]
}
// 递归 生成菜单
const getItem = (routes: Route[]): MenuItem[] => {
  return routes.map((route, index) => {
    const { path, label = 'label', children } = route
    const _children = children?.length && children?.length > 1 ? getItem(children as Route[]) : undefined
    return {
      key: path,
      path,
      children: _children,
      // 有子路由的时候渲染纯文本，没有子路由的时候渲染link
      label: _children?.length ? label : <Link to={path}>{label}</Link>,
    }
  })
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const XMenu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  console.log('@@@@菜单渲染')
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    console.log('🚀 ~ file: XMenu.tsx:74 ~ keys:', keys)

    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const _items = getItem(baseRoutes.children as Route[])

  const menuItems = [
    {
      key: '/home',
      path: '/home',
      label: <Link to={'/home'}>首页</Link>,
    },
    ..._items,
  ]
  console.log('🚀 ~ file: XMenu.tsx:67 ~ baseRoutes:', baseRoutes)
  console.log('🚀 ~ file: XMenu.tsx:62 ~ items:', menuItems)

  return (
    <Menu
      mode='inline'
      theme='dark'
      // openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256, height: '100%' }}
      // style={{ width: 256, minHeight: 700 }}
      items={menuItems}
    />
  )
}

export default React.memo(XMenu)
