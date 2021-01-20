<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <EleButton>Button</EleButton>
  <EleButton tooltip circle icon="el-icon-check">Button</EleButton>
  <EleButton type="delete">Button</EleButton>
  <Markdown />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Markdown from './markdown.md'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Markdown
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
