```vue
<template>
  <EleSelect v-model="value" :options="options" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { value: 'Option1', label: 'Option1' },
        { value: 'Option2', label: 'Option2' },
        { value: 'Option3', label: 'Option3' },
        { value: 'Option4', label: 'Option4' },
        { value: 'Option5', label: 'Option5' }
      ]
    }
  }
}
</script>
```