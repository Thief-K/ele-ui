<template>
  <el-select
    :value="newValue"
    :clearable="clear"
    :disabled="disabled"
    :multiple="multiple"
    :filterable="filterable"
    @input="handleChange"
  >
    <el-option
      v-for="(item, index) in newOptions"
      :label="getI18n(item.name)"
      :value="item.code"
      :disabled="item.disabled"
      :key="index"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getOptionsByCodeType } from '../../src/utils/options'
import { query } from '../../src/utils/common'

// Common select
export default {
  name: 'EleSelect',
  data() {
    return {
      newValue: this.multiple ? [] : null,
      newOptions: []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // current option
    value: {
      type: [String, Array]
    },
    // whether support multiple
    multiple: {
      type: Boolean,
      default: false
    },
    // whether support filter
    filterable: {
      type: Boolean,
      default: false
    },
    // whether show clear button
    clear: {
      type: Boolean,
      default: true
    },
    // whether disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // data dictionary
    codeType: {
      type: String
    },
    // request URL
    url: {
      type: String
    },
    // request parameters (need URL)
    queryParam: {
      type: Object,
      default: () => {
        return null
      }
    },
    // custom options
    options: {
      type: Array,
      default: () => {
        return null
      }
    },
    // whether need to i18n (need options)
    needI18n: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 初始化国际化
    initI18n() {
      const i18Keys = []
      this.options.forEach(e => {
        i18Keys.push(e.name)
      })
      this.i18Keys = i18Keys
    },

    // 获取国际化
    getI18n(name) {
      return this.needI18n && this.options && this.options.length > 0 ? this._$Z[name] : name
    },

    // 选项改变时事件
    handleChange(value) {
      if (this.newValue !== value) {
        // triggered when value change
        // @arg current selected value
        this.$emit('change', value)
      }
    },

    // 获取当前选中项的名称
    getCurrentNames(value) {
      if (Array.isArray(value)) {
        const names = []
        value.forEach(val => {
          const current = this.newOptions.find(option => option.code === val)
          names.push(current.name)
        })
        return names
      } else {
        const name = null
        const current = this.newOptions.find(option => option.code === value)
        return current ? current.name : name
      }
    },

    // 初始化
    init() {
      if (this.codeType) {
        // 设置字典码时
        getOptionsByCodeType(this.codeType).then(response => {
          const data = response
          if (data && data.length > 0) {
            const options = [] // 所有选项
            // 设置所有选项
            data.forEach(e => {
              options.push(e)
            })
            this.newOptions = options
            // 设置默认值
            this.setDefault()
          }
        })
      } else if (this.url) {
        // 设置请求路径时
        query(this.url, this.queryParam).then(response => {
          const data = response.data.data
          if (data && data.length > 0) {
            const options = [] // 所有选项
            // 设置所有选项
            data.forEach(e => {
              const obj = {
                code: String(e.bm || e.BM || e.code || ''),
                name: String(e.mc || e.MC || e.name)
              }
              options.push(obj)
            })
            this.newOptions = options
            // 设置默认值
            this.setDefault()
          }
        })
      } else if (this.options) {
        // 传入选项时
        this.newOptions = this.options
        // 设置默认值
        this.setDefault()
      }
    },

    // 设置默认值
    setDefault() {
      const supportOptions = []
      this.newOptions.forEach(e => {
        if (!e.disabled) {
          supportOptions.push(e.code)
        }
      })
      if (this.newOptions.length > 0) {
        let newValue = this.value || this.newValue
        let code = null
        code = supportOptions.length > 0 ? supportOptions[0] : null // 默认必选项
        if (!this.multiple) {
          // 单选时
          const flag = supportOptions.includes(newValue)
          newValue = flag ? newValue : this.clear ? null : code
        } else {
          // 多选时
          const intersection = supportOptions.filter(v => newValue.includes(v)) // 有效选项
          let equal = true
          newValue.forEach(v => {
            if (!intersection.includes(v)) {
              equal = false
            }
          })
          if (!equal) {
            newValue = intersection
          }
          if (!this.clear) {
            newValue = newValue.length !== 0 ? newValue : code ? [code] : this.newValue
          }
        }
        // 过滤重复监听
        if (this.newValue !== newValue || this.value !== this.newValue) {
          this.newValue = newValue
          this.$emit('change', this.newValue)
        }
      }
    },

    // 清除数据
    clearValue() {
      this.newOptions = []
      this.newValue = this.multiple ? [] : null
      this.$emit('change', this.newValue)
    }
  },
  created() {
    if (this.needI18n && this.options) {
      this.initI18n()
    }
    this.init()
  },
  watch: {
    value(val) {
      this.newValue = val || (this.multiple ? [] : null)
      this.setDefault(this.newOptions)
    },
    codeType() {
      this.clearValue()
      this.init()
    },
    url() {
      this.clearValue()
      this.init()
    },
    queryParam() {
      this.clearValue()
      this.init()
    },
    options() {
      if (this.needI18n) {
        this.initI18n()
      }
      this.clearValue()
      this.init()
    }
  }
}
</script>
