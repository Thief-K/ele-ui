```vue
<template>
  <EleTable ref="table" :url="url" :toolbar="toolbar" :columns="columns" row-key="id" :multiple="true" />
</template>

<script>
export default {
  data() {
    return {
      url: '/common/table',
      toolbar: [{ type: 'query', label: 'query', callback: this.query }],
      columns: [
        { label: 'gender', prop: 'gender' },
        { label: 'no', prop: 'no' },
        { label: 'name', prop: 'name' },
        { label: 'age', prop: 'age' }
      ]
    }
  },
  methods: {
    query() {
      this.$refs.table.queryData()
    }
  }
}
</script>
```