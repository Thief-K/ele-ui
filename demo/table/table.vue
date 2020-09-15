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
        <CodeHeader class="markdown-body" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import EleTable from '../../src/components/table/table.vue'
import CodeBasic from './code/code-basic.md'
import CodeHeader from './code/code-basic.md'
import './mock'

export default {
  components: { EleTable, CodeBasic, CodeHeader },
  data() {
    return {
      url1: '/common/table1',
      url2: '/common/table2',
      url3: '/common/table3',
      toolbar1: [{ type: 'query', label: 'query', callback: () => this.query(1) }],
      toolbar2: [{ type: 'query', label: 'query', callback: () => this.query(2) }],
      toolbar3: [{ type: 'query', label: 'query', callback: () => this.query(3) }],
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
      ]
    }
  },
  methods: {
    query(number) {
      this.$refs['table' + number].queryData()
    }
  }
}
</script>
