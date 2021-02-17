// 客户端入口

import { createApp } from './app'

// 客户端特定引导逻辑……

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
// 在客户端调用mount方法，以激活模式使dom和state的响应以及事件交互生效
app.$mount('#app')