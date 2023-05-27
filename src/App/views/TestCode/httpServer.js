/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-05-12 13:37:38
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-05-16 19:09:48
 * @FilePath: \webpackProject\src\App\views\TestCode\httpServer.js
 * @Description: xiangshangzhi写的文件
 *
 */
const http = require('http')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
  console.log('req is ---', req.url)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('Hello World\n')
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
