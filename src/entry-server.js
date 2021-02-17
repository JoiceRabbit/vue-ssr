// 服务端入口

import { createApp } from './app'

export default context => {
  const { app } = createApp()

  // 返回跟实例，服务端路由匹配，数据欲取
  // 进过renderToString得到html字符串
  return app
}