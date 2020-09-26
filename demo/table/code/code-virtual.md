```vue
<template>
  <EleTable ref="table" :url="url" height="400" virtual-scroll :toolbar="toolbar" :columns="columns" />
</template>

<script>
export default {
  data() {
    return {
      url: '/common/table',
      toolbar: [{ type: 'query', label: 'query', callback: this.query }],
      columns: [
        { label: 'no', prop: 'no' },
        { label: 'name', prop: 'name' },
        { label: 'gender', prop: 'gender' },
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