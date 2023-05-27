const { render } = require('less')

/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-04-19 19:59:32
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-05-15 20:48:33
 * @FilePath: \webpackProject\src\App\views\TestCode\proxy.js
 * @Description: vue3响应式原理
 *
 */
const isObject = (val) => val !== null && typeof val === 'object'

const observe = (obj) => {
  const proxyObj = new Proxy(obj, {
    get(target, key, proxyObj) {
      const value = target[key]
      console.log(`${key} is get`)
      /* 当读取的属性是一个对象时，将其变成响应式
       * 只有在读取该属性的时候才会 将其变成响应式，不会初次进来就一直深度遍历对象
       */
      if (isObject(value)) {
        return observe(value)
      }
      return Reflect.get(target, key, proxyObj)
    },
    set(target, key, val, proxyObj) {
      console.log(`${key} is set: ${val}`)
      return Reflect.set(target, key, val, proxyObj)
    },
  })
  return proxyObj
}
const targetobj = {
  age: 18,
  desc: {
    name: 'xiang',
    geo: 'HK',
  },
}

const proyObj = observe(targetobj)

proyObj.age = 18
proyObj.age

proyObj.desc.newP = 'proxyObj.desc.newP'
proyObj.desc.newP

let renderCount = 0

const countPrint = () => {
  const pcount = () =>
    requestAnimationFrame(() => {
      renderCount % 60 === 0 && console.log('渲染------', renderCount)
      renderCount++
      if (renderCount === 1000) {
        renderCount = 0
      }
      pcount()
    })

  const prdle = () =>
    requestIdleCallback((timing) => {
      renderCount % 10 === 0 &&
        console.log('渲染剩余时间------', timing.timeRemaining())
      prdle()
    })

  pcount()
  prdle()
}

countPrint()
