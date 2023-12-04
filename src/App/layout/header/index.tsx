/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-28 12:50:51
 * @FilePath: \reactProject\src\App\layout\header\index.tsx
 */

import React, { Suspense } from 'react'
import styles from './style.module.css'

const Entry = () => {
  console.log('Entry')
  return <div className={styles.wrap}>俺是头部</div>
}

export default Entry
