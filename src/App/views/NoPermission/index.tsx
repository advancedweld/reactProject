import style from './style.module.css'

function NoPermission(props) {
  console.log("🚀 ~ file: index.tsx:4 ~ NoPermission ~ props:", props)
  
  return (
    <>
      <div className={style.wrap}>
        <h1> 对不起，您没有权限 </h1>
      </div>
    </>
  )
}

export default NoPermission
