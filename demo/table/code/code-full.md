```vue
<template>
  <EleTable ref="table" :url="url" :toolbar="toolbar" :columns="columns" index multiple />
</template>

<script>
export default {
  data() {
    return {
      url: '/common/table',
      toolbar: [{ type: 'query', label: 'query', callback: this.query }],
      columns: [
        { label: '', prop: 'status', type: 'status', align: 'center', filter: this.statusFilter },
        { label: 'name', prop: 'name' },
        { label: 'gender', prop: 'gender', type: 'select', dictCode: 'gender' },
        { label: 'age', prop: 'age', type: 'input', edit: this.editFilter },
        { label: 'hobby', prop: 'hobby', type: 'tag', filter: this.hobbyFilter },
        { label: 'score', prop: 'score', type: 'number', min: 0, max: 100, precision: 0 },
        { label: 'website', prop: 'website', type: 'href', filter: this.websiteFilter, callback: this.clickWebsite },
        { label: 'subscribe', prop: 'subscribe', type: 'switch', activeColor: '#1d8bd8', activeValue: 1, inactiveValue: 0 },
        {
          label: 'operation',
          prop: 'operation',
          type: 'operation',
          operations: [
            { type: 'edit', label: 'edit', callback: this.edit },
            { type: 'delete', label: 'delete', callback: this.delete }
          ]
        }
      ]
    }
  },
  methods: {
    query() {
      this.$refs.table.queryData()
    },

    statusFilter({ row }) {
      if (row.score > 66) return '#67c23a'
      else if (row.score > 33) return '#03a9f4'
      else return '#f56c6c'
    },

    editFilter({ row }) {
      return row.subscribe === 1
    },

    hobbyFilter({ value }) {
      if (value === 'game') return 'success'
      if (value === 'movie') return 'danger'
      if (value === 'music') return 'primary'
      return 'info'
    },

    websiteFilter({ row }) {
      return row.subscribe === 1
    },

    clickWebsite({ value }) {
      this.$alert(value)
    },

    edit({ row }) {
      const json = JSON.stringify(row, null, 2)
      this.$msgbox({ title: 'Form data', message: <pre>{json}</pre> })
    },

    delete({ row }) {
      const json = JSON.stringify(row, null, 2)
      this.$msgbox({ title: 'Form data', message: <pre>{json}</pre> })
    }
  }
}
</script>
```