/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2024-04-09 10:25:54
 * @FilePath: \reactProject\src\App\views\Mobx\myMobax.js
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-06-19 12:32:54
 *
 */

const getSingleEventBus = (() => {
  let instance
  return () => {
    return instance
  }
})()

const s1 = getSingleEventBus()
const s2 = getSingleEventBus()
// console.log('@@@si---s2', s1 === s2)
const eventBus = {}
let _dependency = null

const observable = (obj) => {
  const proxyObj = new Proxy(obj, {
    // 拦截读取,读取的时候需要将函数添加到数组中
    get(target, key) {
      if (_dependency) {
        eventBus[key] = eventBus[key] || []
        eventBus[key].push(_dependency)
      }
      return target[key]
    },

    set(target, key, value) {
      target[key] = value
      eventBus[key] && eventBus[key].forEach((fn) => fn(value))
    },
  })
  return proxyObj
}

const observe = (func) => {
  // 开始收集依赖，将依赖函数放在一个全局变量
  _dependency = func
  // 执行函数，此时函数内部会触发get方法，将依赖函数添加到数组中
  func()
  // 停止收集依赖
  _dependency = null
}

const pObj = observable({
  name: 'xiangshangzhi',
  age: 18,
})
observe(() => {
  console.log('观察name', pObj.name)
})
observe(() => {
  console.log('观察age', pObj.age)
})

pObj.name = 'xiangshangzhi2'
pObj.age = 19
pObj.name = 'xiangshangzhi55'
pObj.age = 33
pObj.name = 'xiangshangzh3'
