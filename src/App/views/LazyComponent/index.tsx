import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import {
  useLocation,
  useNavigate,
  unstable_HistoryRouter as useHistory,
  useNavigation,
  unstable_useBlocker as useBlocker,
} from 'react-router-dom'
import style from './style.module.css'

function LazyCom() {
  return (
    <>
      <h1> 懒加载组件 </h1>
    </>
  )
}

export default LazyCom
