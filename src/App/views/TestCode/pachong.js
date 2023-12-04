/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-11-17 15:50:17
 * @FilePath: \reactProject\src\App\views\TestCode\pachong.js
 * @Description: 爬虫
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-11-17 15:51:01
 *
 */
const http = require('http')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
  console.log('req is ---', req.url)
  res.statusCode = 20
  res.setHeader('Content-Type', 'text/html')
  res.end('Hello World\n')
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
