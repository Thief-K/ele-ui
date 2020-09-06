```vue
<template>
  <EleSelect v-model="value" :request="request" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      request: {
        url: '/common/select',
        param: {}
      }
    }
  }
}
</script>
```