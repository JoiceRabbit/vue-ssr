const Vue = require('vue');
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevBuild = require('./build/setup-dev-build')

const server = express()

server.use('/dist', express.static('./dist'))

const isProd = process.env.NODE_ENV === 'production'

let renderer, isReturn
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 监听源文件 --》 构建打包 --》 生成渲染器renderer --》同步浏览器
  isReturn = setupDevBuild(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}

const render = (req, res) => {
  renderer.renderToString({
    title: 'vue-ssr',
    mate: `
      <mate name="description" content="vue srr"></mate>
    `
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internet error')
    }

    // 除了依赖mate标签的charset，还设置内容的类型，双保险
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end(html)
  })
}

server.get('/', isProd
  ? render
  : async (req, res) => {
    // 等待编译完成再渲染
    await isReturn
    render(req, res)
  }
)

server.listen(3000, () => {
  console.log('server is listening 3000')
})