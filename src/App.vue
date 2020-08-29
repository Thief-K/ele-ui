<template>
  <div id="app">
    <Button @click="onClick">Button</Button>
    <br />
    <Select v-model="select" :groups="groups"></Select>{{ select }}
  </div>
</template>

<script>
import Button from './components/button/button.vue'
import Select from './components/select/select.vue'

export default {
  name: 'App',
  data() {
    return {
      select: '2',
      options: [
        { value: '1', label: 'A', disabled: true },
        { value: '2', label: 'B' },
        { value: '3', label: 'C' }
      ],
      groups: [
        {
          label: '动物',
          options: [
            { value: '1', label: '猫', disabled: true },
            { value: '2', label: '老鼠' },
            { value: '3', label: '狗' }
          ]
        },
        {
          label: '人类',
          options: [
            { value: '4', label: '男人', disabled: true },
            { value: '5', label: '女人' },
            { value: '6', label: '人妖' }
          ]
        }
      ]
    }
  },
  components: {
    Button,
    Select
  },
  methods: {
    onClick() {
      this.groups = [
        {
          label: '动物',
          options: [
            { value: '1', label: '猫', disabled: true },
            { value: '2', label: '老鼠' },
            { value: '3', label: '狗' }
          ]
        }
      ]
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
