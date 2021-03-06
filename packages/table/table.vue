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
          {{ item.i18n || item.label }}
        </EleButton>
      </template>
    </div>

    <el-table
      ref="eleTable"
      v-virtual-scroll="virtualScrollConfig"
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
      <el-table-column v-if="multiple && !virtualScroll" type="selection" width="42" align="center"></el-table-column>

      <!-- selection -->
      <el-table-column v-if="multiple && virtualScroll" width="42" align="center">
        <template #header>
          <el-checkbox
            :disabled="tableData.length === 0"
            :indeterminate="halfChecked"
            :value="allChecked"
            @change="toggleAllSelection"
          />
        </template>
        <template #default="slotScope">
          <el-checkbox
            :value="slotScope.row.checked"
            :key="Math.random()"
            @input="rowSelectedChanged(slotScope.row)"
            @click.native.stop
          />
        </template>
      </el-table-column>

      <!-- column -->
      <template v-for="column in columns">
        <table-column :column="column" :key="column.prop + column.label"></table-column>
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
import VirtualScrollDirective from './virtual-scroll'

export default {
  inheritAttrs: false,
  name: 'EleTable',
  components: { EleButton, TableColumn },
  directives: { virtualScroll: VirtualScrollDirective },
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
      loading: false,
      bigData: [],
      allChecked: false,
      halfChecked: false
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
          pagerCount: 5,
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
    },
    // whether open big table
    virtualScroll: {
      type: Boolean,
      default: false
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
      return this.tableData.length !== 0 && this.footer !== null && !this.virtualScroll
    },
    virtualScrollConfig() {
      return {
        data: this.bigData,
        itemHeight: { mini: 36, small: 40, medium: 44 }[this.$ELEMENT.size]
      }
    }
  },
  methods: {
    // Init i18n
    async initI18n() {
      if (this.columns.length === 0) {
        return
      }
      const keys = []
      const addI18n = (columns, keys) => {
        columns.forEach(column => {
          keys.push(column.label)
          if (column.operations) {
            column.operations.forEach(e => {
              keys.push(e.label)
            })
          }
          if (column.children) {
            addI18n(column.children, keys)
          }
        })
      }
      const setI18n = (columns, data) => {
        columns.forEach(column => {
          this.$set(column, 'i18n', data[column.label])
          if (column.operations) {
            column.operations.forEach(e => {
              e.i18n = data[e.label]
            })
          }
          if (column.children) {
            setI18n(column.children, data)
          }
        })
      }
      addI18n(this.columns, keys)
      this.toolbar.forEach(e => {
        keys.push(e.label)
      })
      const { data } = await this.$http.get('/common/getI18n', { keys })
      setI18n(this.columns, data)
      this.toolbar.forEach(e => {
        e.i18n = data[e.label]
      })
    },

    // Triggered when click toolbar button
    toolbarClick(callback) {
      callback && callback(this.getSelections())
    },

    // Triggered when current row change
    onCurrentChange(row) {
      if (!row) {
        // when virtual scrolling, the row will be null
        return
      }
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
      const parentRows = rows.filter(v => v.children)
      if (parentRows.length > 0) {
        parentRows.forEach(row => {
          this.onSelect([row], row)
        })
      } else {
        this.toggleRowSelection(row => {
          this.toggleRowSelection(row.children, false)
          return true
        }, false)
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
      return !this.multiple ? this.current : this.virtualScroll ? this.bigData.filter(v => v.checked) : this.selections
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
            if (this.virtualScroll) {
              this.bigData = data.result
              this.tableData = []
              this.allChecked = false
              this.halfChecked = false
            } else {
              this.tableData = data.result
            }
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
    },

    // Triggered when row checked (virtual scroll only)
    rowSelectedChanged(row) {
      this.$set(row, 'checked', !row.checked)
      const count = this.bigData.filter(v => v.checked).length
      this.allChecked = false
      this.halfChecked = false
      if (row.checked) {
        if (count === this.bigData.length) {
          this.allChecked = true
        } else {
          this.halfChecked = true
        }
      } else {
        if (count !== 0) {
          this.halfChecked = true
        }
      }
    },

    // Triggered when toggle all selection (virtual scroll only)
    toggleAllSelection(value) {
      this.allChecked = value
      this.halfChecked = false
      this.bigData.forEach(v => {
        this.$set(v, 'checked', value)
      })
    }
  },
  created() {
    if (this.$system.i18n) {
      this.initI18n()
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
