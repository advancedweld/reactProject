/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2024-04-09 10:25:54
 * @FilePath: \reactProject\src\App\views\Mobx\myMobax.js
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-04-09 10:57:42
 *
 */

const eventBus = {}
let _dependency = null

const observable = (obj) => {
  const proxyObj = new Proxy(obj, {
    set(target, key, value) {
      target[key] = value
      eventBus[key] && eventBus[key].forEach((fn) => fn(value))
    },
    // 拦截读取,读取的时候需要将函数添加到数组中
    get(target, key) {
      if (_dependency) {
        eventBus[key] = eventBus[key] || []
        eventBus[key].push(_dependency)
      }
      return target[key]
    },
  })
  return proxyObj
}

const observe = (func) => {
  // 开始收集依赖，将依赖函数放在一个全局变量
  _dependency = func
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
