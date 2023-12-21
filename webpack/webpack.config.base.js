// webpack.config.base.js

const path = require('path')
const WebpackBar = require('webpackbar')
const webpack = require('webpack')
// 根据相对路径获取绝对路径
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath)
// HTML模板
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 使用MiniCssExtractPlugin 将css单独打包，替换style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 基础配置
const baseConfig = {
  // 入口文件
  entry: resolvePath('../src/index.tsx'),
  // 出口文件
  output: {
    path: resolvePath('../dist'),
    publicPath: '/',
    // filename: '[contenthash].bundle.js',
    filename: '[name].[contenthash].bundle.js',
    /* 是否输出es6模块 */
    // module: true,
  },

  // experiments: {
  //   outputModule: true,
  // },
  resolve: {
    // modules: ['node_modules'],
    modules: [resolvePath('../node_modules'), resolvePath('../src')],

    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@view': resolvePath('../src/App/views/'),
      '@': resolvePath('../src/'),
    },
  },
  // 所有loader的配置都在 module.rules 中
  module: {
    rules: [
      // 对css文件的处理
      // use里的loader如果有多个的情况下，切记执行顺序是：从下到上（或者从右到左）
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // for development
                localIdentName: '[path][name]__[local]',
                // for production
                // localIdentName: "[hash:base64]",
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      // 对less文件的处理
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // 对ts|tsx文件的处理
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ["@babel/preset-env"],
          //   cacheDirectory: true,
          //   // plugins: ['@babel/plugin-proposal-object-rest-spread']
          // },
        },
      },
      // 对图片的处理
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  // 代码分割，antd和konva单独打包
  optimization: {
    splitChunks: {
      chunks: 'all',
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd',
        },
        konva: {
          test: /[\\/]node_modules[\\/]konva[\\/]/,
          name: 'konva',
        },
      },
    },
  },
  // 插件的处理
  plugins: [
    new HtmlWebpackPlugin({
      // title 配置
      title: 'Webpack V5 + React',
      // 模板导入
      template: resolvePath('../public/index.html'),
      // 名称为
      filename: 'index.html',
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
}
module.exports = {
  baseConfig,
}
