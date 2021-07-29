const webpack = require('webpack')
const WebPackMerge = require('webpack-merge')
// 提取出css，不注入js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 配置压缩js/css/gzip
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')


// 基础 webpack 配置
const baseConfig = require('./webpack.config')

module.exports = WebPackMerge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          // 提取 css 为单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // 图片加载
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于 10k 转换成base64编码
              limit: 10000,
              // outputPath: '/dist/images/',
              // 有 CDN时 public path
              // publicPath: '/images/'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css', // prod 加上 hash
      chunkFilename: '[id].[hash].css' // prod 加上 hash
    }),
    new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
  ],
  optimization: {
    runtimeChunk: 'single',
    // css、js 压缩设置. 生产环境压缩设置
    minimizer: [
      // 压缩代码
      new UglifyJsPlugin({
        cache: true, // 缓存
        parallel: true, // 并行加载
        sourceMap: false, // 生产不生成 sourceMap
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
      // 构建时开启 gzip 压缩
      new CompressionWebpackPlugin({
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 8192,
        minRatio: 0.8
      })
    ],
    // 打包文件切分设置
    splitChunks: {
      chunks: 'all', // 默认async 可选值 all 和 initial
      maxInitialRequests: Infinity, // 一个入口文件最大的并行请求数
      minSize: 0, // 避免体积过小而被忽略
      minChunks: 1, // 默认也是1表示最小引用次数\

      cacheGroups: {
				vendor: {
					name: 'vendor', // chunk 名称
					priority: 1, // 权限更高，优先抽离，重要！！！
					test: /node_modules/,
					minSize: 0, // 大小限制
					minChunks: 1 // 最少复用过几次
				},
				common: {
					name: 'common',
					priority: 0,
					minSize: 0,
					minChunks: 2
				}
        // verdor: {
        //   test: /[\\/]node_modelues[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
        //   // eslint-disable-next-line
        //   name(modele, chunks, chcheGroupKey) { // // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
        //     return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
        //   }
        // }
      }


    }
  }
})
