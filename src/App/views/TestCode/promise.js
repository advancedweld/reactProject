/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-19 19:59:32
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-08-21 10:57:03
 * @FilePath: \reactProject\src\App\views\TestCode\promise.js
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
}

// asyncFn()
//   .then((res) => {
//     console.log('异步结束-----', res)
//   })
//   .catch((e) => console.log('异步出错-----', e))

// const resFn = (async () => {
//   await 7
//   return '7777'
// })()
// console.log('asyncFn-----', resFn)

// resFn.then((res) => {
//   console.log('resFn-----', res)
// })

const pendingPromise = new Promise(() => {})
console.log('pendingPromise-----', pendingPromise)
pendingPromise.then((res) => {
  console.log('pendingPromise_res-----', res)
})

const resolvePromise = Promise.resolve('resolvePromise')
resolvePromise
  .then((res) => {
    console.log('resolvePromise then-----', res)
  })
  .then((res) => {
    console.log('resolvePromise then2-----', res)
    /** 返回一个pending状态的promise  */
    return new Promise((resolve) => {})
  })
  .then((res) => {
    /** 该then方法不会执行  因为前面then 方法返回的是一个Pending状态的promise */
    console.log('resolvePromise then3-----', res)
  })
