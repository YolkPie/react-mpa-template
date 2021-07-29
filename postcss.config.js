module.exports = {
  plugins: {
    autoprefixer: {},
    // 对于想忽略的px写成大写即可，诸如 width: 1PX
    'postcss-pxtorem': {
      rootValue: 100, // 1rem = 100px，750px设计稿 -> 7.5rem
      propList: ['*']
      // 如有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 'selectorBlackList': ['weui-'],  // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
    }
  }
}
