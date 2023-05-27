/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-19 19:59:32
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-05-08 22:49:26
 * @FilePath: \webpackProject\src\App\views\TestCode\promise.js
 * @Description: promise测试
 *
 */

const generataPromsise = (delay, success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(`success---- ${Date.now()}`)
      } else {
        reject(`fail---- ${Date.now()}`)
      }
    }, delay * 100)
  })
}

const asyncFn = async () => {
  const res1 = await (() => {})()
  console.log('res1-----', res1)
  const res2 = await generataPromsise(1)
  console.log('res2-----', res2)

  return 66666
  // const res3 = await generataPromsise(1, false)
  // console.log('res3-----', res3)
}

asyncFn()
  .then((res) => {
    console.log('异步结束-----', res)
  })
  .catch((e) => console.log('异步出错-----', e))

const res1 = (async () => {
  await 7
  return '7777'
})()
console.log('asyncFn-----', res1)
