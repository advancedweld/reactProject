/*
 * @Author: xiangshangzhi xiangshangzhi@163.com
 * @Date: 2023-12-05 10:13:38
 * @FilePath: \reactProject\src\App\views\TestCode\bff\index.js
 * @Description:
 *  参考 https://juejin.cn/post/6996935339386339336?searchId=20231204171741B12896FA78BE33471DBA
 *  https://juejin.cn/post/6997704376777179172
 * @LastEditors: xiangshangzhi xiangshangzhi@163.com
 * @LastEditTime: 2023-12-05 10:25:37
 *
 */
const http = require('http')

const BFF = http.createServer((req, res) => {
  handleBFF(req, res)
})

BFF.listen(8080, () => {
  console.log('BFF Server is running at 8080 port')
})

function handleBFF(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  switch (req.url) {
    case '/order/add':
      addOrder(req, res)
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

// 处理添加订单方法
function addOrder(req, res) {
  if (req.method !== 'POST') {
    res.end('{ code: 500, msg: "route not found", data: "" }')
    return
  }
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', async () => {
    const orderResult = await publicRequest('http://localhost:8081/order/add', data)
    const dataResult = await publicRequest('http://localhost:8082/data/add', data)

    console.log('@@@@@@orderResult', orderResult)

    res.end(JSON.stringify({ orderResult, dataResult }))
  })
}

// 公共请求方法
async function publicRequest(url, data) {
  return new Promise((resolve) => {
    const request = http.request(url, (response) => {
      let resData = ''
      response.on('data', (chunk) => {
        resData += chunk
      })
      response.on('end', () => {
        resolve(resData.toString())
      })
    })

    request.write(data)
    request.end()
  })
}
