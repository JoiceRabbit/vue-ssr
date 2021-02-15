const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer()

const App = new Vue({
  template: `
    <div id="app">
      <h1>{{message}}</h1>
    </div>
  `,
  data() {
    return {
      message: 'hello vue ssr'
    }
  }
})