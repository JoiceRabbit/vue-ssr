const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar');

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(resolve => ready = resolve)

  let template
  let serverBundle
  let clientManifest

  const update = () => {
    if (serverBundle && template && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }

  // 默认判断执行一次
  update()

  // 获取到模板文件
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')

  // 监听模板文件的修改
  chokidar.watch(templatePath).on('change', (event, path) => {
    console.log(template);
    update()
  });

  return onReady
}