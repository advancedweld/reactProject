/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-04 08:40:43
 * @FilePath: \reactProject\src\App\views\TestCode\myPromise.js
 * @Description: xiangshangzhi写的文件
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2024-01-23 08:48:54
 *
 */
function MyPromise(executor) {
  if (typeof executor !== 'function') {
    // eslint-disable-next-line prefer-template
    throw new Error('Promise resolver' + executor + 'is not a function')
  }
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      self.onResolvedCallback.forEach((fun) => fun(value))
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      self.onRejectedCallback.forEach((fun) => fun(reason))
    }
  }

  try {
    // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject) // 执行executor
  } catch (e) {
    reject(e)
  }
}

// eslint-disable-next-line
Promise.prototype.then = function (_onResolved, _onRejected) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  let promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  const onResolved = typeof _onResolved === 'function' ? onResolved : function (value) {}
  const onRejected = typeof _onRejected === 'function' ? onRejected : function (reason) {}

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    promise2 = new Promise(function (resolve, reject) {
      try {
        const x = onResolved(self.data)
        if (x instanceof Promise) {
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          x.then(resolve, reject)
        } else {
          resolve(x) // 否则，以它的返回值做为promise2的结果
        }
      } catch (e) {
        reject(e) // 如果出错，以捕获到的错误做为promise2的结果
      }
    })

    return promise2
  }

  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
  if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      try {
        const x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    })

    return promise2
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          const x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          const x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
    return promise2
  }
}

// 为了下文方便，我们顺便实现一个catch方法
// eslint-disable-next-line
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

function Mpromise(exector) {
  if (typeof exector !== 'function') {
    throw new Error('Promise resolver' + exector + 'is not a function')
  }

  const self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      self.onResolvedCallback.forEach((fun) => fun(value))
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      self.onRejectedCallback.forEach((fun) => fun(reason))
    }
  }

  try {
    exector(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Mpromise.prototype.then = function (_onResolved, _onRejected) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  let promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  const onResolved = typeof _onResolved === 'function' ? onResolved : function (value) {}
  const onRejected = typeof _onRejected === 'function' ? onRejected : function (reason) {}
}
