const path = require("path");
// 根据相对路径获取绝对路径
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

// 基础配置
const baseConfig = {
  // 入口文件
  entry: resolvePath("../src/index.tsx"),
  // 出口文件
  output: {
    path: resolvePath("../dist"),
    filename: "[name].bundle.js",
  },
};
module.exports = {
  baseConfig,
};
