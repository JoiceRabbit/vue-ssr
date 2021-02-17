/**
 * 客户端打包配置
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    // 相对路径，相对于执行打包的目录
    app: './src/entry-client.js'
  },

  module: {
    rules: [
      // ES6 转 ES5
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true, // 开启缓存，如果代码，以及打包配置，插件等都没有变化，则不再重新编译，使用上次编译的结果 https://juejin.cn/post/6844904120436916232
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
    ]
  },

  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  optimization: {
    splitChunks: {
      // manifest 文件描述了哪些文件需要 webpack 加载
      // 如果 webpack 生成的 hash 发生改变，manifest 文件也会发生改变。因此，vendor bundle 的内容也会发生改变，并且失效。所以，我们需要将 manifest 文件提取出来。
      name: "manifest",
      minChunks: Infinity
    }
  },

  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
