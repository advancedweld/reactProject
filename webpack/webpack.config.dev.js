/*
 * @Author: xiangshangzhi
 * @Date: 2022-07-20 12:42:23
 * @FilePath: \reactProject\webpack\webpack.config.dev.js
 */
// 合并规则

const isProductionMode = process.env.NODE_ENV === 'production'

const { merge } = require('webpack-merge')
// 导入基础配置
const { baseConfig } = require('./webpack.config.base')
module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: 'development',
  // 便于开发调试 这里开启source-map模式
  devtool: 'source-map',
  // webpack-dev-server 的一下配置，webpack-dev-server 会提供一个本地服务(serve)
  devServer: {
    // host
    host: '127.0.0.1',
    // 端口
    port: 3000,
    // 热更新
    hot: true,
    // 启动时打开浏览器
    open: true,
    // 路由返回index.html'，避免出现404
    historyApiFallback: true,
  },
})
