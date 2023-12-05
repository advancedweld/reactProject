/*
 * @Author: xiangshangzhi
 * @Date: 2023-12-05 09:01:32
 * @FilePath: \reactProject\src\App\views\TestCode\bff\server.js
 * @Description:node 写的后端服务
 */
const http = require('http')

// 订单服务
const orderApp = http.createServer((req, res) => {
  handleOrderInput(req, res)
})

orderApp.listen(8081, () => {
  console.log('Order Server is running at 8081 port')
})

// 数据服务
const dataApp = http.createServer((req, res) => {
  handleDataInput(req, res)
})

dataApp.listen(8082, () => {
  console.log('Data Server is running at 8082 port')
})

function handleOrderInput(req, res) {
  switch (req.url) {
    case '/order/add':
      res.end('{ code: 200, msg: "success", data: "" }')
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

function handleDataInput(req, res) {
  switch (req.url) {
    case '/data/add':
      res.end('{ code: 200, msg: "success", data: "" }')
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

const segmentApp = http.createServer((req, res) => {
  handleaSegmentInput(req, res)
})

segmentApp.listen(8083, () => {
  console.log('Order Server is running at 8083 port')
})

function handleaSegmentInput(req, res) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  // res.setHeader('Access-Control-Allow-Credentials', 'true')
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  switch (req.url) {
    case '/controlnet-seg':
      res.end('{ code: 200, msg: "success", data: "ssefsdfeddk23c3effve78fsdnk34r8fd" }')
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}
