/* eslint-disable no-unreachable */
/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-19 19:59:32
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-01-19 09:38:27
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

;(() => {
  return
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
})()
;(function () {
  console.log('ahahha')

  /**
   * 输出结果
   * sync function
   * hello world
   * Async function1
   * promied promise1
   * Async function2
   * promied promise2
   * Async function3
   * promied promise3
   *  首先执行同步代码。 遇到微任务后，将微任务插入到微任务队列尾部，交替执行
   */
  const fn = async function () {
    // 同步代码 首先执行 并插入第一个微任务A
    console.log('sync function')
    await '666'
    // 执行微任务A，插入一个微任务B到队尾
    console.log('Async function1')
    await '777'
    console.log('Async function2')
    await '888'
    console.log('Async function3')
    await '999'
  }

  fn()
  // 同步代码先执行
  console.log('hello world')
  // 插入微任务B到队尾
  Promise.resolve('promise1')
    .then((res) => {
      // 执行微任务，并插入新微任务
      console.log('promied', res)
      return 'promise2'
    })
    .then((res) => {
      console.log('promied', res)
      return 'promise3'
    })
    .then((res) => {
      console.log('promied', res)
      return 'promise4'
    })
})()
