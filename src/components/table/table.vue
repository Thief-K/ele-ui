<template>
  <el-card class="ele-card ele-table" shadow="never">
    <!-- title -->
    <template v-if="title" slot="header">
      <div class="card-title">{{ title }}</div>
    </template>
    <template v-else-if="slot" slot="header">
      <div class="card-title"><slot name="title"></slot></div>
    </template>

    <!-- toolbar -->
    <div v-if="toolbar.length > 0" style="margin-bottom: 8px;">
      <template v-for="(item, index) in toolbar">
        <EleButton v-bind="item" :key="index" @click="toolbarClick(item.callback)">
          {{ item.label }}
        </EleButton>
      </template>
    </div>

    <el-table
      ref="eleTable"
      v-loading="loading"
      v-bind="$attrs"
      :data="tableData"
      tooltip-effect="dark"
      highlight-current-row
      v-on="listeners"
      @current-change="onCurrentChange"
      @select="onSelect"
      @select-all="onSelectAll"
      @selection-change="onSelectionChange"
    >
      <!-- index -->
      <el-table-column v-if="multiple === false" type="index" label="#" width="42" align="center"></el-table-column>

      <!-- selection -->
      <el-table-column v-if="multiple === true" type="selection" width="42" align="center"></el-table-column>

      <!-- column -->
      <template v-for="column in columns">
        <table-column :column="column" :key="column.prop + column.i18n"></table-column>
      </template>
    </el-table>

    <!-- pagination -->
    <div v-if="showFooter" class="table-page">
      <el-pagination
        background
        v-bind="$attrs"
        :total="total"
        :current-page.sync="page"
        :page-sizes="pageSizes"
        :pager-count="footer.pagerCount"
        :layout="footer.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="display: inline-block;"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import EleButton from '../button/button'
import TableColumn from './table-column'

export default {
  inheritAttrs: false,
  name: 'EleTable',
  components: { EleButton, TableColumn },
  data() {
    return {
      i18Keys: [],
      start: 1,
      limit: 10,
      page: 1,
      tableData: [],
      total: 0,
      current: null,
      selections: [],
      queryParam: null,
      loading: false
    }
  },
  props: {
    // title
    title: {
      type: String,
      required: false
    },
    // toolbar
    toolbar: {
      type: Array,
      default: () => {
        return []
      }
    },
    // request URL
    url: {
      type: String
    },
    // column data
    columns: {
      type: Array,
      required: true
    },
    // whether multiple
    multiple: {
      type: Boolean,
      default: null
    },
    // custom footer <br>
    // footer = { pagerCount: 5, layout: 'total' } (5 <= pagerCount(odd number) <= 21) <br>
    // footer = null (hide pagination)
    footer: {
      type: Object,
      default: () => {
        return {
          pagerCount: 9,
          layout: 'total, sizes, prev, pager, next'
        }
      }
    },
    // page sizes
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 30, 50, 100, 300, 500, 1000]
      }
    }
  },
  computed: {
    slot() {
      return this.$slots.title
    },
    listeners() {
      return { ...this.$listeners }
    },
    showFooter() {
      return this.tableData.length !== 0 && this.footer !== null
    }
  },
  methods: {
    // Triggered when click toolbar button
    toolbarClick(callback) {
      callback && callback(this.getSelections())
    },

    // Triggered when current row change
    onCurrentChange(row) {
      this.current = row
      this.$emit('current-change', row)
    },

    // Triggered when row select
    onSelect(rows, row) {
      // handle parent nodes checked issue when multiple is true and tree table is open
      if ((this.$attrs['rowKey'] || this.$attrs['row-key']) && this.multiple) {
        const selected = rows.find(item => item === row) !== undefined
        if (row.children) {
          // parent node synchronize children nodes
          this.toggleRowSelection(row.children, selected)
        } else {
          // child node synchronize parent nodes
          const parent = this.tableData.find(data => {
            return data.children && data.children.find(child => child === row) !== undefined
          })
          const intersection = parent.children.filter(child => rows.includes(child))
          this.toggleRowSelection([parent], intersection.length === parent.children.length)
        }
      }
    },

    // Triggered when row select
    onSelectAll(rows) {
      if (rows.length > 0) {
        rows.forEach(row => {
          this.onSelect([row], row)
        })
      } else {
        this.toggleRowSelection(this.tableData, false)
      }
    },

    // Triggered when selection change
    onSelectionChange(rows) {
      this.selections = rows
      this.$emit('selection-change', rows)
    },

    // Triggered when page size change
    handleSizeChange(size) {
      this.limit = size
      this.queryParam.start = 0
      this.doQuery(this.queryParam)
    },

    // Triggered when current row change
    handleCurrentChange(page) {
      this.start = (page - 1) * this.limit + 1
      this.queryParam.start = this.start
      this.doQuery(this.queryParam)
    },

    // Get selections
    getSelections() {
      return this.multiple ? this.selections : this.current
    },

    // Toggle selected rows
    toggleRowSelection(param, flag = true) {
      if (typeof param === 'function') {
        this.tableData.forEach(row => {
          if (param && param(row)) {
            this.$refs.eleTable.toggleRowSelection(row, flag)
          }
        })
      } else if (Array.isArray(param)) {
        param.forEach(row => {
          this.$refs.eleTable.toggleRowSelection(row, flag)
        })
      }
    },

    // Query data
    queryData(param, callback) {
      this.page = 1
      if (this.footer === null) {
        this.limit = 5000
      }
      const queryParam = {
        start: 1,
        limit: this.limit
      }
      this.queryParam = Object.assign(queryParam, param)
      this.doQuery(param, callback)
    },

    // Execut query
    doQuery(param, callback) {
      this.loading = true
      this.$http
        .get(this.url, param)
        .then(response => {
          const data = response.data
          if (data) {
            this.tableData = data.result
            this.total = data.total
            this.current = null
            this.selections = []
            callback && callback(this.tableData)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    // Reset table (for external call)
    resetTable(rows) {
      this.tableData = rows || []
      this.total = rows.length || 0
      this.start = 1
      this.limit = 10
      this.page = 1
      this.current = null
      this.selections = []
      this.queryParam = {}
    }
  }
}
</script>

<style lang="scss">
.ele-table {
  .el-card__body {
    padding: 10px 10px !important;
  }
}
</style>

<style lang="scss" scoped>
.table-page {
  display: flex;
  padding-top: 10px;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
