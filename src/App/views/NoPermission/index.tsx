import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import style from './style.module.css'

function NoPermission(props) {
  console.log('🚀 ~ file: index.tsx:4 ~ NoPermission ~ props:', props)
  const nav = useNavigate()
  return (
    <>
      <div className={style.wrap}>
        <h1> 对不起，您没有权限 </h1>
        <Button onClick={() => nav('/')}>返回首页</Button>
      </div>
    </>
  )
}

export default NoPermission
