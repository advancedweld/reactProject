/* eslint-disable prefer-const */
/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-05-12 13:37:38
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-06 15:44:16
 * @FilePath: \reactProject\src\App\views\TestCode\quickSort.js
 * @Description: 快速排序
 *
 */

const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  let left = []
  let mid = arr[0]
  let right = []
  // 注意从第一个元素开始遍历，第0个元素是基准元素
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i])
    } else if (arr[i] > mid) {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)]
}

let arr = [1, 2, 3, 4, 55, 33, 65, 3, 4, 5, 6, 223, 4, 324, 34]

console.log(quickSort(arr)) // [1, 2, 3, 4, 5, 6, 33, 34, 55, 65, 223, 324]
