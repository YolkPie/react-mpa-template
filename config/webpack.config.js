// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

// 打包后文件位置
const distDir = path.resolve(__dirname, '../deploy')
// 源文件目录
const srcDir = path.resolve(__dirname, '../src')
// 根目录
const rootDir = path.resolve(__dirname, '../')

const webpackConfig = {
  entry: {},
  // entry: path.resolve(srcDir, 'index'),
  output: {
    filename: '[name].[hash].js',
    path: distDir
  },
  resolve: {
    // 配置解析文件拓展名
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    // 配置别名
    alias: {
      '@': path.resolve(srcDir),
      '@styles': path.resolve(srcDir, 'styles'),
      '@utils': path.resolve(srcDir, 'utils'),
      '@pages': path.resolve(srcDir, 'pages'),
      '@components': path.resolve(srcDir, 'components'),
      '@router': path.resolve(srcDir, 'router')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      // 字体加载
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modelues/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: '项目构建完成',
      logo: path.resolve(rootDir, 'public/favicon.ico'),
      suppressSuccess: true
    }),
		new CleanWebpackPlugin()
  ]
}
const pagePath = './src/pages/**?/*.html'
// 配置pages多页面获取当前文件夹下的html和js
const getPagesConfig = globPath => {
  const entries = {}
  let basename; let tmp; let
    pathname

  glob.sync(globPath).forEach((entry) => {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = basename // 正确输出js和html的路径
    entries[pathname] = {
      entry: `src/${tmp[0]}/${tmp[1]}/${tmp[1]}.tsx`,
      template: `src/${tmp[0]}/${tmp[1]}/${tmp[2]}`,
      filename: tmp[2],
			chunk: tmp[1]
    }
  })
  return entries
}

const pagesConfig = getPagesConfig(pagePath)
Object.keys(pagesConfig).forEach((name) => {
  const configItem = pagesConfig[name]
  webpackConfig.entry[name] = path.join(rootDir, configItem.entry)
  const plugin = new HtmlWebpackPlugin({
    filename: configItem.filename,
    template: path.join(rootDir, configItem.template),
		chunks: [`${configItem.chunk}`, 'runtime', 'vendor','common']
  })
  webpackConfig.plugins.push(plugin)
})

module.exports = webpackConfig
