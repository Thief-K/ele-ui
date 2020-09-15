<template>
  <!-- 多级表头 -->
  <el-table-column v-if="showMultiHead" align="center" :label="column.i18n || column.label">
    <template v-for="(item, index) in column.children">
      <table-column :column="item" :key="Math.random() + index"></table-column>
    </template>
  </el-table-column>

  <!-- 普通表头 -->
  <el-table-column
    v-else
    :show-overflow-tooltip="showTooltip(column)"
    :fixed="column.fixed"
    :label="column.i18n || column.label"
    :width="getOperationWidth(column)"
    :sortable="column.sort"
    :prop="column.prop"
    :align="column.align"
    :header-align="column.headerAlign"
  >
    <template slot-scope="scope">
      <!-- href -->
      <template v-if="column.type === 'href'">
        <hx-button
          v-if="filterHref(scope.row, column.filterMethod, scope.row[column.prop])"
          type="text"
          :label="scope.row[column.prop]"
          @click="handleClick(scope.row, scope.$index, column.prop, column.method)"
        >
        </hx-button>
        <span v-else v-html="scope.row[column.prop]" style="margin-left: 6px;"></span>
      </template>

      <!-- status -->
      <template v-if="column.type === 'status'">
        <span class="circle-status" :style="{ backgroundColor: filterStatus(scope.row, column.filterMethod) }"></span>
      </template>

      <!-- tag -->
      <template v-if="column.type === 'tag'">
        <el-tag :type="filterTag(scope.row, column.filterMethod)" size="small">{{ scope.row[column.prop] }}</el-tag>
      </template>

      <!-- switch -->
      <template v-if="column.type === 'switch' && checkEdit(scope.row, column.editFilter)">
        <el-switch
          v-model="scope.row[column.prop]"
          active-color="#1d8bd8"
          :active-value="column.activeValue"
          :inactive-value="column.inactiveValue"
          @change="value => valueChange(value, scope.row, column.method)"
        >
        </el-switch>
      </template>

      <!-- input -->
      <template v-if="column.type === 'input' && checkEdit(scope.row, column.editFilter)">
        <el-input
          v-model.trim="scope.row[column.prop]"
          @change="value => valueChange(value, scope.row, column.method)"
          style="width: 100%;"
        >
        </el-input>
      </template>

      <!-- number -->
      <template v-if="column.type === 'number' && checkEdit(scope.row, column.editFilter)">
        <el-input-number
          v-model.trim="scope.row[column.prop]"
          :min="column.min"
          :max="column.max"
          :precision="column.precision"
          :controls="column.controls"
          @change="value => valueChange(value, scope.row, column.method)"
          style="width: 100%;"
        >
        </el-input-number>
      </template>

      <!-- select -->
      <template v-if="column.type === 'select' && checkEdit(scope.row, column.editFilter)">
        <hx-select
          v-model="scope.row[column.prop]"
          :code-type="column.codeType"
          :clear="column.clear"
          :disabled="column.disabled"
          @change="value => valueChange(value, scope.row, column.method)"
        >
        </hx-select>
      </template>

      <!-- operations -->
      <template v-if="column.type === 'operations'">
        <template v-for="item in column.operations">
          <hx-button
            v-if="filterOperation(scope.row, item.filterMethod)"
            table
            :type="item.type"
            :label="item.i18n"
            :disabled="disableFilter(scope.row, item.disabledMethod)"
            @click="() => handleClick(scope.row, scope.$index, column.prop, item.method)"
            :key="item.label"
          >
          </hx-button>
        </template>
      </template>

      <!-- content -->
      <template v-if="!column.type">
        <span v-html="formatContent(scope.row[column.prop], scope.row, column.formatMethod)"></span>
      </template>
    </template>
  </el-table-column>
</template>

<script>
// import HxButton from '../../button'
// import HxSelect from '../../select'

export default {
  name: 'TableColumn',
  // components: { HxButton, HxSelect },
  props: {
    column: {
      type: Object
    }
  },
  computed: {
    showMultiHead() {
      return this.column.children && this.column.children.length > 0
    }
  },
  methods: {
    // 超链接、操作按钮点击时回调
    handleClick(row, index, prop, callback) {
      if (callback) {
        callback(row, index, prop)
      }
    },

    // 超链接过滤
    filterHref(row, filterMethod, content) {
      if (content === null || content === undefined) {
        return false
      }
      if (filterMethod) {
        return filterMethod(row)
      } else {
        return true
      }
    },

    // 状态过滤
    filterStatus(row, filterMethod) {
      if (filterMethod) {
        let type = filterMethod(row)
        return type === 'danger' ? '#f56c6c' : '#67c23a'
      } else {
        return ''
      }
    },

    // 标签过滤
    filterTag(row, filterMethod) {
      if (filterMethod) {
        return filterMethod(row)
      } else {
        return ''
      }
    },

    // 行内按钮过滤
    filterOperation(row, filterMethod) {
      if (filterMethod) {
        return filterMethod(row)
      } else {
        return true
      }
    },

    // 行内编辑过滤
    checkEdit(row, filterMethod) {
      if (filterMethod) {
        return filterMethod(row)
      } else {
        return true
      }
    },

    // 行内按钮禁用状态过滤
    disableFilter(row, filterMethod) {
      if (filterMethod) {
        return filterMethod(row)
      } else {
        return false
      }
    },

    // 行内编辑时回调
    valueChange(value, row, callback) {
      if (!row.op) {
        row.op = 'edit'
      }
      if (callback) {
        callback(value, row)
      }
    },

    // 格式化内容
    formatContent(content, row, formatMethod) {
      if (formatMethod) {
        return formatMethod(content, row)
      }
      return content
    },

    // 提示
    showTooltip(column) {
      const array = ['status', 'operations', 'switch', 'input', 'number', 'select']
      if (array.includes(column.type) && !column.editFilter) {
        return false
      } else {
        return true
      }
    },

    // 获取操作列宽
    getOperationWidth(data) {
      let width = data.width || (data.type === 'operations' ? data.operations.length * 44 : '')
      return width && width < 88 ? 88 : width
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-status {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  vertical-align: middle;
}
</style>
