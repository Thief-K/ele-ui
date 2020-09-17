<template>
  <div>
    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleTable ref="table1" :url="url1" :toolbar="toolbar1" :columns="columns1" />
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('table.multiHeader') }}</template>
      <template #content>
        <EleTable ref="table2" :url="url2" :toolbar="toolbar2" :columns="columns2" />
      </template>
      <template #code>
        <CodeHeader class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('table.treeTable') }}</template>
      <template #content>
        <EleTable ref="table3" :url="url3" :toolbar="toolbar3" :columns="columns3" row-key="id" :multiple="true" />
      </template>
      <template #code>
        <CodeTree class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('table.lazyLoad') }}</template>
      <template #content>
        <EleTable ref="table4" :url="url4" :toolbar="toolbar4" :columns="columns4" row-key="id" lazy :load="load" />
      </template>
      <template #code>
        <CodeLazy class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('common.fullFunction') }}</template>
      <template #content>
        <EleTable ref="table5" :url="url5" :toolbar="toolbar5" :columns="columns5" index multiple />
      </template>
      <template #code>
        <CodeFull class="markdown-body" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import EleTable from '../../src/components/table/table.vue'
import CodeBasic from './code/code-basic.md'
import CodeHeader from './code/code-header.md'
import CodeTree from './code/code-tree.md'
import CodeLazy from './code/code-lazy.md'
import CodeFull from './code/code-full.md'
import './mock'

export default {
  components: { EleTable, CodeBasic, CodeHeader, CodeTree, CodeLazy, CodeFull },
  data() {
    return {
      url1: '/common/table1',
      url2: '/common/table2',
      url3: '/common/table3',
      url4: '/common/table4',
      url5: '/common/table5',
      toolbar1: [{ type: 'query', label: 'query', callback: () => this.query(1) }],
      toolbar2: [{ type: 'query', label: 'query', callback: () => this.query(2) }],
      toolbar3: [{ type: 'query', label: 'query', callback: () => this.query(3) }],
      toolbar4: [{ type: 'query', label: 'query', callback: () => this.query(4) }],
      toolbar5: [{ type: 'query', label: 'query', callback: () => this.query(5) }],
      columns1: [
        { label: 'no', prop: 'no' },
        { label: 'name', prop: 'name' },
        { label: 'gender', prop: 'gender' },
        { label: 'age', prop: 'age' }
      ],
      columns2: [
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
      ],
      columns3: [
        { label: 'gender', prop: 'gender' },
        { label: 'no', prop: 'no' },
        { label: 'name', prop: 'name' },
        { label: 'age', prop: 'age' }
      ],
      columns4: [
        { label: 'name', prop: 'name' },
        { label: 'talent', prop: 'talent' },
        { label: 'age', prop: 'age' }
      ],
      columns5: [
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
    query(number) {
      this.$refs['table' + number].queryData()
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([{ id: Math.random() + '', name: 'cat', talent: 'miao', age: 1, hasChildren: true }])
      }, 500)
    },

    statusFilter({ row }) {
      if (row.score > 66) return '#67c23a'
      else if (row.score > 33) return '#03a9f4'
      else return '#f56c6c'
    },

    editFilter({ row }) {
      return row.subscribe === 1
    },

    websiteFilter({ row }) {
      return row.subscribe === 1
    },

    clickWebsite({ value }) {
      this.$alert(value)
    },

    hobbyFilter({ value }) {
      if (value === 'game') return 'success'
      if (value === 'movie') return 'danger'
      if (value === 'music') return 'primary'
      return 'info'
    },

    edit({ row }) {
      const json = JSON.stringify(row, null, 2)
      this.$msgbox({ title: 'Form data', message: <pre>{json}</pre> })
    },

    delete({ row }) {
      const json = JSON.stringify(row, null, 2)
      this.$msgbox({ title: 'Form data', message: <pre>{json}</pre> })
    }
  },
  created() {
    this.$nextTick(() => {
      this.query(1)
      this.query(2)
      this.query(3)
      this.query(4)
      this.query(5)
    })
  }
}
</script>
