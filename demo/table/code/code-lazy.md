```vue
<template>
  <EleTable ref="table" :url="url" :toolbar="toolbar" :columns="columns" row-key="id" lazy :load="load" />
</template>

<script>
export default {
  data() {
    return {
      url: '/common/table',
      toolbar: [{ type: 'query', label: 'query', callback: this.query }],
      columns: [
        { label: 'name', prop: 'name' },
        { label: 'talent', prop: 'talent' },
        { label: 'age', prop: 'age' }
      ]
    }
  },
  methods: {
    query() {
      this.$refs.table.queryData()
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([{ id: Math.random() + '', name: 'cat', talent: 'miao', age: 1, hasChildren: true }])
      }, 500)
    }
  }
}
</script>
```