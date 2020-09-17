```vue
<template>
  <EleTable ref="table" :url="url" :toolbar="toolbar" :columns="columns" />
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
        {
          label: 'hobby',
          prop: 'hobby',
          children: [
            { label: 'hobby1', prop: 'hobby1' },
            { label: 'hobby2', prop: 'hobby2' },
            { label: 'hobby3', prop: 'hobby3' }
          ]
        }
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