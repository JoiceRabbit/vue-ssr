<template>
  <div id="app">
    <h1>{{message}}</h1>
    <h1>客户端交互测试</h1>
    <input type="text" v-model="message">
    <button @click="handleClick">点击测试</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: '你好hello vue ssr'
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    }
  }
}
</script>

<style>

</style>