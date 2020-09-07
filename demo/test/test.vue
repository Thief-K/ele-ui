<template>
  <div>{{ msg }}</div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    return {
      msg: '123'
    }
  },
  created() {
    const a = { b: 'c' }
    const b = cloneDeep(a)
    console.log(a === b, b)
  }
}
</script>
