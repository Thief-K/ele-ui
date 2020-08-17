<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <HelloWorld>默认按钮</HelloWorld>
    <HelloWorld type="primary">主要按钮</HelloWorld>
    <HelloWorld type="success">成功按钮</HelloWorld>
    <HelloWorld type="info">信息按钮</HelloWorld>
    <HelloWorld type="warning">警告按钮</HelloWorld>
    <HelloWorld type="danger">危险按钮</HelloWorld>
    <HelloWorld type="download">成功按钮</HelloWorld>
    <br />
    <HelloWorld plain>朴素按钮</HelloWorld>
    <HelloWorld type="primary" plain>主要按钮</HelloWorld>
    <HelloWorld type="success" plain>成功按钮</HelloWorld>
    <HelloWorld type="info" plain>信息按钮</HelloWorld>
    <HelloWorld type="warning" plain>警告按钮</HelloWorld>
    <HelloWorld type="danger" plain>危险按钮</HelloWorld>
    <br />
    <HelloWorld round>圆角按钮</HelloWorld>
    <HelloWorld type="primary" round>主要按钮</HelloWorld>
    <HelloWorld type="success" round>成功按钮</HelloWorld>
    <HelloWorld type="info" round>信息按钮</HelloWorld>
    <HelloWorld type="warning" round>警告按钮</HelloWorld>
    <HelloWorld type="danger" round>危险按钮</HelloWorld>
    <br />
    <HelloWorld icon="el-icon-search" circle tooltip></HelloWorld>
    <HelloWorld type="primary" icon="el-icon-edit" circle tooltip :loading="loading" @click="aaa">123</HelloWorld>
    <HelloWorld type="success" icon="el-icon-check" circle></HelloWorld>
    <HelloWorld type="info" icon="el-icon-message" circle></HelloWorld>
    <HelloWorld type="warning" icon="el-icon-star-off" circle></HelloWorld>
    <HelloWorld type="danger" icon="el-icon-delete" circle></HelloWorld>
    <br />
    <HelloWorld disabled>默认按钮</HelloWorld>
    <HelloWorld type="primary" disabled>主要按钮</HelloWorld>
    <HelloWorld type="success" disabled>成功按钮</HelloWorld>
    <HelloWorld type="info" disabled>信息按钮</HelloWorld>
    <HelloWorld type="warning" disabled>警告按钮</HelloWorld>
    <HelloWorld type="danger" disabled>危险按钮</HelloWorld>
    <br />
    <HelloWorld plain disabled>朴素按钮</HelloWorld>
    <HelloWorld type="primary" plain disabled>主要按钮</HelloWorld>
    <HelloWorld type="success" plain disabled>成功按钮</HelloWorld>
    <HelloWorld type="info" plain disabled>信息按钮</HelloWorld>
    <HelloWorld type="warning" plain disabled>警告按钮</HelloWorld>
    <HelloWorld type="danger" plain disabled>危险按钮</HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/button/button.vue'

export default {
  name: 'App',
  data() {
    return {
      loading: false
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    aaa() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
