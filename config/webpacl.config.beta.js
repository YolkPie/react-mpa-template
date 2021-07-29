const WebPackMerge = require('webpack-merge')

// 提取出css，不注入js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 配置压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
          'sass-loader',
          'postcss-loader'
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
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    // css压缩设置. 生产环境压缩设置
    minimizer: [
      new UglifyJsPlugin({
        cache: false, // 不使用缓存
        parallel: true, // 并行加载
        sourceMap: true, // 开发生成 sourceMap
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
})
