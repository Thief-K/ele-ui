```vue
<template>
  <EleForm :items="items" />
</template>

<script>
export default {
  data() {
    return {
      items: [
        { prop: 'input', label: 'Input', elType: 'input' },
        { prop: 'number', label: 'Number', elType: 'number' },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name' }
      ]
    }
  }
}
</script>
```