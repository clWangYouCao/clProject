'use strict'
const utils = require('./utils') // 工具函数
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 友好提示插件
const portfinder = require('portfinder') // 查找可用端口

// process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。
// 它是一个EventEmitter 对象实例
// process.env：指向当前shell环境变量

const HOST = process.env.HOST // host
const PORT = process.env.PORT && Number(process.env.PORT) // 端口

// 合并基本的webpack配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {                                 // "true"
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // 选择一种source map 格式来增强调试过程。不同值明显影响到构建(build)和重新构建(rebuild)速度
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning', // 配置在客户端的日志等级，影响到浏览器开发者工具控制台看到的日志内容
    // 用于方便的开发使用了 H5 History API单页面应用 
    historyApiFallback: { // 可以简单 true 或者任意的 404 响应 可以提供为 index.html 页面
      rewrites: [                         // "/"
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 开启热更新
    // contentBase 配置 DevServer HTTP 服务器文件根目录 默认当前执行目录，通常是项目根目录
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true, // 是否启用 gzip 压缩 默认false
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay // "true" 是否在浏览器以遮罩形式显示报错信息
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // "/"
    proxy: config.dev.proxyTable, // "{}" 代理 
    // 启用quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。意味着来自webpack的错误或警告在控制台不可见
    // 开启后一般非常干净，只有类似的提示 Your application is running here: http://localhost:8080
    quiet: true, // necessary for FriendlyErrorsPlugin
    // watch: false,
    // 启用watch模式，意味着在初始构建后，webpack将继续监听任何已解析文件的更改 默认关闭
    // webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
    // Watch 模式的选项
    watchOptions: {
      poll: config.dev.poll, // "false" 
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // 定义为开发环境
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NamedModulesPlugin(), // 热更新时显示具体的模块路径 HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 编译错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: 'index.html',
      inject: true // 默认true 表示css js路径自动添加到该html文件里(css->header,js->body) false 只单纯生成一个 html 文件
    }),
    // copy custom static assets
    // 把 static 资源复制到相应目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory, // "static"
        ignore: ['.*'] // 忽略.开头文件
      }
    ])
  ]
})

// 导出一个 promise
module.exports = new Promise((resolve, reject) => {
  // process.env.PORT 可以在命令行指定端口号，比如PORT=2000 npm run dev，那访问就是http://localhost:2000
  portfinder.basePort = process.env.PORT || config.dev.port
  // 以配置的端口为基准，寻找可用的端口，比如：8080 占用，那就8081，以此类推
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors // "true" onErrors是一个函数，出错输出错误信息，系统原生的通知
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
