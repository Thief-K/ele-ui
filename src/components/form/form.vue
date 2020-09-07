<template>
  <el-card class="ele-form" shadow="never">
    <!-- title -->
    <div v-if="title" slot="header">
      <div class="header-title">{{ title }}</div>
    </div>

    <el-form v-if="items && items.length > 0" ref="eleForm" :model="formData" :inline="true" :label-width="labelWidth">
      <template v-for="(item, index) in items">
        <!-- input -->
        <el-form-item
          v-if="item.elType === 'input' && checkShow(item)"
          :label="item.label"
          :prop="item.prop"
          :rules="genRules(item.rules)"
          :key="item.prop + item.elType + index"
        >
          <el-input
            v-model.trim="formData[item.prop]"
            v-bind="item"
            @change="handleEvent(formData[item.prop], item.callback)"
          >
          </el-input>
        </el-form-item>

        <!-- number -->
        <el-form-item
          v-if="item.elType === 'number' && checkShow(item)"
          :label="item.label"
          :prop="item.prop"
          :rules="genRules(item.rules)"
          :key="item.prop + item.elType + index"
        >
          <el-input-number
            v-model="formData[item.prop]"
            v-bind="item"
            @change="handleEvent(formData[item.prop], item.callback)"
          >
          </el-input-number>
        </el-form-item>

        <!-- select -->
        <el-form-item
          v-if="item.elType === 'select' && checkShow(item)"
          :label="item.label"
          :prop="item.prop"
          :rules="genRules(item.rules)"
          :key="item.prop + item.elType + index"
        >
          <EleSelect
            v-model="formData[item.prop]"
            v-bind="item"
            @change="handleEvent(formData[item.prop], item.callback)"
          >
          </EleSelect>
        </el-form-item>

        <!-- br -->
        <template v-if="item.elType === 'br'">
          <br :key="item.elType + index" />
        </template>
      </template>
    </el-form>
  </el-card>
</template>

<script>
import EleSelect from '../select/select'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: { EleSelect },
  data() {
    return {
      formData: {}
    }
  },
  props: {
    // title
    title: {
      type: String,
      required: false
    },
    // form items
    items: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Object,
      required: true
    },
    // form label width
    labelWidth: {
      type: String,
      default: '180px'
    }
  },
  methods: {
    // check whether form item show
    checkShow(item) {
      if (item.show === false) {
        delete this.formData[item.id]
      } else if (item.show === true) {
        if (this.formData[item.id] === undefined) {
          this.$set(this.formData, item.id, this.defaultForm[item.id])
        }
      }
      return item.show !== false
    },

    // generate rules
    genRules(rules) {
      const newRules = []
      for (let key in rules) {
        switch (key) {
          case 'required': {
            newRules.push({ required: true, message: this.$t('rule.required'), trigger: ['blur', 'change'] })
            break
          }
          case 'range': {
            const min = rules[key][0]
            const max = rules[key][1]
            newRules.push({
              type: 'number',
              min,
              max,
              message: this.$t('rule.range', { min, max }),
              trigger: ['blur', 'change']
            })
            break
          }
        }
      }
      return newRules
    },

    // handle event
    handleEvent(value, callback) {
      callback && callback(value)
    },

    // set default value
    setDefaultValue() {
      const defaultValue = !this.defaultValue ? {} : cloneDeep(this.defaultValue)
      const formData = {}
      this.items.forEach(item => {
        if (item.elType === 'select') {
          formData[item.prop] = defaultValue[item.prop] || (item.multiple ? [] : '')
        } else {
          formData[item.prop] = defaultValue[item.prop] || null
        }
      })
      for (let key in defaultValue) {
        if (formData[key] === undefined) {
          formData[key] = defaultValue[key]
        }
      }
      this.formData = formData
      // this.defaultForm = cloneDeep(this.formData)
    }
  },
  created() {
    this.setDefaultValue()
  },
  watch: {
    items() {
      this.setDefaultValue()
    },
    defaultValue() {
      this.setDefaultValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.ele-form {
  ::v-deep .el-card__header {
    padding: 3px 20px;
    background-color: #ebeef5;
  }
  ::v-deep .el-card__body {
    padding: 18px 0 0;
  }
}

.header-title {
  display: inline-block;
  line-height: 28px;
  font-size: 16px;
  font-weight: bold;
}
</style>
