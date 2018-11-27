'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css插件
const packageConfig = require('../package.json')

// 返回输出路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory  // "static"
    : config.dev.assetsSubDirectory  // "static"

  // 生成跨平台兼容路径
  return path.posix.join(assetsSubDirectory, _path)
}
// 返回相应的css-loader配置
exports.cssLoaders = function (options) {
  // 作为参数传递进来的options对象
  // {
  //   // sourceMap这里是true
  //   sourceMap: true,
  //   // 是否提取css到单独的css文件
  //   extract: true,
  //   // 是否使用postcss
  //   usePostCSS: true
  // }
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // 创建对应的loader配置
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // 如果提取使用 ExtractTextPlugin 插件提取
      return ExtractTextPlugin.extract({
        use: loaders, // loader 被用于将资源转换成一个 CSS 导出模块
        fallback: 'vue-style-loader' // loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 返回webpack css 相关的配置 { sourceMap: true, usePostCSS: true }
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
// 创建启动服务时出错时提示信息回调
// npm run dev 出错时，FriendlyErrorsPlugin 插件 配置 onErrors输出错误信息
exports.createNotifierCallback = () => {
  // 'node-notifier'是一个跨平台系统通知的页面，当遇到错误时，它能用系统原生的推送方式给你推送信息
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
