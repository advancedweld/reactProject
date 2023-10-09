/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-10-09 15:35:46
 * @FilePath: \reactProject\src\App\views\TestCode\cacheFunction.js
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-10-09 15:47:15
 *
 */

const cacheFunction = (fn) => {
  let isCached = false
  let cache

  return function cachedFn(...args) {
    if (!isCached) {
      isCached = true
      cache = fn(...args)
    } else {
      console.log('函数已经缓存')
    }
    return cache
  }
}

const fun = (num) => {
  console.log('函数执行', num)
}

const cacheFn = cacheFunction(fun)
cacheFn(3)
cacheFn(4)
cacheFn(5)
cacheFn(5)
cacheFn(5)
