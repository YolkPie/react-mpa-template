const webpack = require('webpack')
const path = require('path')
const WebPackMerge = require('webpack-merge')
const glob = require('glob')
const baseConfig = require('./webpack.config')

// 打包后文件位置
const distDir = path.resolve(__dirname, '../dist')

const devWebpackConfig = WebPackMerge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
    path: distDir,
    publicPath: 'build',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
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
  devServer: {
    contentBase: distDir, // 打包后文件位置
    compress: false, // 开发环境不用gzip压缩
    port: 8008, // 端口
    hot: true, // 启用热替换
    hotOnly: true, // 编译成功后刷新
    // open: true, // 是否自动打开浏览器
    disableHostCheck: true, // 解决 127.0.0.1 指向其他域名错误
    historyApiFallback: {
      rewrites: []
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})
// 获取多页html名称
const getHtmlNames = globPath => {
	const result = []
	glob.sync(globPath).forEach(function (entry) {
		result.push(path.basename(entry, path.extname(entry)))
	})
	return result
}
const pagePath = './src/pages/**?/*.html'
const htmlList = getHtmlNames(pagePath)
htmlList.forEach(item => {
	const regExp = new RegExp(`^(\/${item})`)
	devWebpackConfig.devServer.historyApiFallback.rewrites.push( { from: regExp, to: `/build/${item}.html` })
})
module.exports = devWebpackConfig
