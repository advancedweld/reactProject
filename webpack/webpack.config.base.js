// webpack.config.base.js

const path = require("path");
// 根据相对路径获取绝对路径
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);
// HTML模板
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 基础配置
const baseConfig = {
  // 入口文件
  entry: resolvePath("../src/index.tsx"),
  // 出口文件
  output: {
    path: resolvePath("../dist"),
    filename: "[name].bundle.js",
  },
  // 所有loader的配置都在 module.rules 中
  module: {
    rules: [
      // 对css文件的处理
      // use里的loader如果有多个的情况下，切记执行顺序是：从下到上（或者从右到左）
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 对less文件的处理
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 对ts|tsx文件的处理
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
      },
      // 对图片的处理
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  // 插件的处理
  plugins: [
    new HtmlWebpackPlugin({
      // title 配置
      title: "Webpack V5 + React",
      // 模板导入
      template: resolvePath("../public/index.html"),
      // 名称为
      filename: "index.html",
    }),
  ],
};
module.exports = {
  baseConfig,
};
