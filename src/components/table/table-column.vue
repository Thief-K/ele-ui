<template>
  <!-- multi-level header -->
  <el-table-column v-if="multiHeader" align="center" :label="column.i18n || column.label">
    <template v-for="item in column.children">
      <table-column :column="item" :key="item.prop + item.label"></table-column>
    </template>
  </el-table-column>

  <!-- normal header -->
  <el-table-column
    v-else
    :show-overflow-tooltip="showTooltip(column)"
    :fixed="column.fixed"
    :label="column.i18n || column.label"
    :width="calcOperationWidth(column)"
    :sortable="column.sort"
    :prop="column.prop"
    :align="column.align"
    :header-align="column.headerAlign"
  >
    <template v-slot="scope">
      <!-- href -->
      <template v-if="column.type === 'href'">
        <el-button
          v-if="filterShow(scope.row, column.prop, column.filter)"
          type="text"
          @click="handleEvent(scope.row, column.prop, scope.$index, column.callback)"
        >
          {{ scope.row[column.prop] }}
        </el-button>
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- status -->
      <template v-if="column.type === 'status'">
        <span class="circle-status" :style="{ backgroundColor: filterAttr(scope.row, column.prop, column.filter) }"></span>
      </template>

      <!-- tag -->
      <template v-if="column.type === 'tag'">
        <el-tag v-if="filterShow(scope.row, column.prop)" :type="filterAttr(scope.row, column.prop, column.filter)" size="small">
          {{ scope.row[column.prop] }}
        </el-tag>
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- switch -->
      <template v-if="column.type === 'switch'">
        <el-switch
          v-if="filterEdit(scope.row, column.edit)"
          v-model="scope.row[column.prop]"
          v-bind="column"
          @change="handleEvent(scope.row, column.prop, scope.$index, column.callback)"
        />
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- input -->
      <template v-if="column.type === 'input'">
        <el-input
          v-if="filterEdit(scope.row, column.edit)"
          v-model.trim="scope.row[column.prop]"
          @change="handleEvent(scope.row, column.prop, scope.$index, column.callback)"
        />
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- number -->
      <template v-if="column.type === 'number'">
        <el-input-number
          v-if="filterEdit(scope.row, column.edit)"
          v-model="scope.row[column.prop]"
          v-bind="column"
          @change="handleEvent(scope.row, column.prop, scope.$index, column.callback)"
        />
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- select -->
      <template v-if="column.type === 'select'">
        <EleSelect
          v-if="filterEdit(scope.row, column.edit)"
          v-model="scope.row[column.prop]"
          v-bind="column"
          @change="handleEvent(scope.row, column.prop, scope.$index, column.callback)"
        />
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>

      <!-- operation -->
      <template v-if="column.type === 'operation'">
        <template v-for="item in column.operations">
          <EleButton
            v-if="filterShow(scope.row, column.prop, column.filter, true)"
            tooltip
            circle
            :type="item.type"
            @click="handleEvent(scope.row, column.prop, scope.$index, item.callback)"
            :key="item.label"
          >
            {{ item.i18n || item.label }}
          </EleButton>
        </template>
      </template>

      <!-- default -->
      <template v-if="!column.type">
        <span>{{ scope.row[column.prop] }}</span>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import EleButton from '../button/button'
import EleSelect from '../select/select'

export default {
  name: 'TableColumn',
  components: { EleButton, EleSelect },
  props: {
    column: {
      type: Object
    }
  },
  computed: {
    multiHeader() {
      return this.column.children && this.column.children.length > 0
    }
  },
  methods: {
    // Callback when trigger event
    handleEvent(row, prop, index, callback) {
      callback && callback({ row, prop, value: row[prop], index })
    },

    // Filter display
    filterShow(row, prop, callback, pass = false) {
      if (!row[prop] && row[prop] !== 0 && !pass) {
        return false
      }
      if (callback) {
        return callback({ row, value: row[prop] })
      } else {
        return true
      }
    },

    // Filter attribute
    filterAttr(row, prop, callback) {
      if (callback) {
        return callback({ row, value: row[prop] })
      } else {
        return ''
      }
    },

    // Filter editable
    filterEdit(row, callback) {
      if (callback) {
        return callback({ row })
      } else {
        return true
      }
    },

    // Whether show tooltip
    showTooltip(column) {
      const array = ['status', 'operation', 'switch', 'input', 'number', 'select']
      if (array.includes(column.type) && !column.edit) {
        return false
      } else {
        return true
      }
    },

    // Calculate operation column width
    calcOperationWidth(data) {
      let width = data.width || (data.type === 'operation' ? data.operations.length * 47 : '')
      return width && width < 94 ? 94 : width
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
