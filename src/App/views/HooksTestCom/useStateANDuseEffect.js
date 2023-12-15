/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-12 14:32:08
 * @FilePath: \reactProject\src\App\views\HooksTestCom\useStateANDuseEffect.JS
 * @Description: https://juejin.cn/post/6888919751004880910?searchId=20231123173149DA150DD0C554DAD767EF
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-12 14:41:40
 *
 */

const useState = (() => {
  let index = -1
  const currentStateBoxs = []

  return (initialState) => {
    index++
    const currentIndex = index
    currentStateBoxs[currentIndex] = currentStateBoxs[currentIndex] || initialState
    const setState = (newState) => {
      currentStateBoxs[currentIndex] = newState
      // render() // 这个 render 可以理解为触发了整个 react app 渲染，就像 ReactDOM.render();
    }
    return [currentStateBoxs[currentIndex], setState]
  }
})()

const useEffect = (() => {
  // 数组记录每个 useEffect 的 deps
  const lastDepsBoxs = []
  // 数组记录每个 useEffect 的清除回调
  const lastClearCallbacks = []
  let index = 0

  return (callback, deps) => {
    const lastDeps = lastDepsBoxs[index]
    const changed =
      !lastDeps || // 首次渲染，肯定触发
      !deps || // deps 不传，次次触发
      deps.some((dep, index) => dep !== lastDeps[index]) // 正常比较
    if (changed) {
      lastDepsBoxs[index] = deps
      // 首先执行上一次的清除回调
      if (lastClearCallbacks[index]) {
        lastClearCallbacks[index]()
      }

      // 执行useeffect的副作用，并记录清除回调
      lastClearCallbacks[index] = callback()
    }
    index++
  }
})()
