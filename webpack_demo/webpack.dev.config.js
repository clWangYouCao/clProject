const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/main.js'
  },
  output: {
    path: path.resolve('./dist'), //相对转绝对路径
    filename: "build.js"
  },

  //声明模块 包含各个loader
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader?limit=4096' //小于limit => 生成build.js里base64   大于limit => 生成图片 
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader' // 先解析less成css，再解析css成style，最终插入body中style标签
      },
      // 处理 ES6 7 8
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'], // 处理关键字
          plugins: ['transform-runtime'] // 处理函数
        }
      },
      // 处理 vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  plugins: [
    // 插件的执行顺序与元素索引有关
    new HtmlWebpackPlugin({
      template: './src/index.html' // 参照物 将此目录下的index.html移到设置的path下
    })
  ],
  watch: true //监视文件发生改动，自动产出build.js
};