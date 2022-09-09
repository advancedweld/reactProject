/*
 * @Author: xiangshangzhi
 * @Date: 2022-09-09 13:13:41
 * @FilePath: /webpackProject/postcss.config.js
 */

module.exports = {
  plugins: [
    [
      // postcss-preset-env包含了sutoprefixer，不需要再配置了
      "postcss-preset-env",
      {
        // 其他选项
      },
    ],
  ],
};
