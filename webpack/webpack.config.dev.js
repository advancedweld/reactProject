// webpack.config.dev.js

// 合并规则
const { merge } = require("webpack-merge");
// 导入基础配置
const { baseConfig } = require("./webpack.config.base");
module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: "development",
});
