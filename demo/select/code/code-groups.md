```vue
<template>
  <EleSelect v-model="value" :groups="groups" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      groups: [
        {
          label: 'Group1',
          options: [
            { value: '1', label: 'Option1' },
            { value: '2', label: 'Option2' }
          ]
        },
        {
          label: 'Group2',
          options: [
            { value: '3', label: 'Option3' },
            { value: '4', label: 'Option4' },
            { value: '5', label: 'Option5' }
          ]
        }
      ]
    }
  }
}
</script>
```