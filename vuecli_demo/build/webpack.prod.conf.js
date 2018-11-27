'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') 
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩处理css的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩处理js的插件

const env = require('../config/prod.env')
// 合并基本webpack配置
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 通过styleLoaders函数生成样式的一些规则
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true, // 是否提取css到单独的css文件
      usePostCSS: true  // 是否使用postcss
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot, // 这里是根目录下的dist
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 文件名称 chunkhash
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // chunks名称 chunkhash
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env  // 定义具体是什么环境
    }),
    new UglifyJsPlugin({ // 压缩js插件
      uglifyOptions: {
        compress: {
          warnings: false
          // 构建后的文件 常用的配置还有这些
          // 去除console.log 默认为false。  传入true会丢弃对console函数的调用。
          // drop_console: true,
          // 去除debugger
          // drop_debugger: true,
          // 默认为null. 你可以传入一个名称的数组，而UglifyJs将会假定那些函数不会产生副作用。
          // pure_funcs: [ 'console.log', 'console.log.apply' ],
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true // 平行处理（同时处理）加快速度
    }),
    // extract css into its own file 提取css到单独的css文件
    new ExtractTextPlugin({ 
      filename: utils.assetsPath('css/[name].[contenthash].css'), // 提取到相应的文件名 使用内容hash contenthash
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true, // allChunks 默认是false,true指提取所有chunks包括动态引入的组件。
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap // "true"
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index, // 输出html名称 dist/index.html
      template: 'index.html', // 使用哪个模板
      inject: true,
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格和换行
        removeAttributeQuotes: true // 删除html标签中属性的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 在chunk被插入到html之前，你可以控制它们的排序。允许的值 ‘none’ | ‘auto’ | ‘dependency’ | {function} 默认为‘auto’.
      // dependency 依赖（从属）
      chunksSortMode: 'dependency' 
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(), // 根据代码内容生成普通模块的id，确保源码不变，moduleID不变。
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(), // 开启作用域提升 webpack3新的特性，作用是让代码文件更小、运行的更快
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({ // 提取公共代码
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // 把公共的部分放到 manifest 中
      minChunks: Infinity // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // 提取动态组件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
      // 它会与 `options.chunks` 并行被加载。可以通过提供想要的字符串，而不是 `true` 来对输出的文件进行更换名称。
      async: 'vendor-async',
      children: true, // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择
      minChunks: 3 // 最小3个，包含3，chunk的时候提取
    }),

    // copy custom static assets
    // 把static资源复制到相应目录。
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
// 如果开始gzip压缩，使用compression-webpack-plugin插件处理。这里配置是false
// 需要使用是需要安装 npm i compression-webpack-plugin -D
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
// 输出分析的插件 运行npm run build --report
// config.build.bundleAnalyzerReport 这里是 process.env.npm_config_report
// build结束后会自定打开 http://127.0.0.1:8888 链接
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
