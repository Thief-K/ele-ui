```vue
<template>
  <EleForm :items="items" :default-value="defaultValue" />
</template>

<script>
export default {
  data() {
    return {
      items: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } }
      ],
      defaultValue: {
        input: 'Hello World',
        number: 25,
        select: '02'
      }
    }
  }
}
</script>
```