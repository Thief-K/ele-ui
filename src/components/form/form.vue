<template>
  <el-card class="ele-card" shadow="never">
    <!-- title -->
    <template v-if="title" slot="header">
      <div class="card-title">{{ title }}</div>
    </template>
    <template v-else-if="slot" slot="header">
      <div class="card-title"><slot name="title"></slot></div>
    </template>

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
          <el-input v-model.trim="formData[item.prop]" v-bind="item" @change="handleEvent(formData[item.prop], item.callback)" />
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
          />
        </el-form-item>

        <!-- select -->
        <el-form-item
          v-if="item.elType === 'select' && checkShow(item)"
          :label="item.label"
          :prop="item.prop"
          :rules="genRules(item.rules)"
          :key="item.prop + item.elType + index"
        >
          <EleSelect v-model="formData[item.prop]" v-bind="item" @change="handleEvent(formData[item.prop], item.callback)" />
        </el-form-item>

        <!-- button -->
        <el-form-item v-if="item.elType === 'button' && checkShow(item)" label=" " :key="item.elType + index">
          <EleButton v-bind="item" @click="() => item.callback()">
            {{ item.label }}
          </EleButton>
        </el-form-item>

        <!-- br -->
        <!-- <template v-if="item.elType === 'br'">
          <br :key="item.elType + index" />
        </template> -->
      </template>
    </el-form>

    <div v-else class="empty-block">
      <span class="empty-text">{{ $t('ele.noData') }}</span>
    </div>
  </el-card>
</template>

<script>
import EleSelect from '../select/select'
import EleButton from '../button/button'
import cloneDeep from 'lodash/cloneDeep'

// Form
export default {
  components: { EleSelect, EleButton },
  data() {
    return {
      formData: {},
      formDataBackup: {}
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
      required: false,
      default: () => {
        return []
      }
    },
    // default value
    defaultValue: {
      type: Object,
      required: false
    },
    // form label width
    labelWidth: {
      type: String,
      default: '180px'
    }
  },
  computed: {
    slot() {
      return this.$slots.title
    }
  },
  methods: {
    // Check whether form item show
    checkShow(item) {
      if (item.show === false) {
        delete this.formData[item.prop]
      } else if (item.show === true) {
        if (this.formData[item.prop] === undefined) {
          this.$set(this.formData, item.prop, this.formDataBackup[item.prop])
        }
      }
      return item.show !== false
    },

    // Generate rules
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

    // Get form data
    getFormData() {
      return cloneDeep(this.formData)
    },

    // check form and get parameters (for external call)
    checkForm(callback) {
      this.$refs.eleForm.validate(valid => {
        if (valid && callback) {
          callback(this.getFormData())
        }
      })
    },

    // Clear validate (for external call)
    clearValidate(props) {
      if (this.$refs.eleForm) {
        this.$refs.eleForm.clearValidate(props)
      }
    },

    // Reset fields (for external call)
    resetFields(data) {
      this.setDefaultValue(data)
    },

    // Handle event
    handleEvent(value, callback) {
      callback && callback(value)
    },

    // Get default value
    getDefaultValue(data) {
      let defaultValue
      if (data) {
        defaultValue = data
      } else {
        defaultValue = !this.defaultValue ? {} : cloneDeep(this.defaultValue)
      }
      const formData = {}
      this.items.forEach(item => {
        if (item.prop === undefined) {
          return
        }
        if (item.elType === 'input') {
          formData[item.prop] = defaultValue[item.prop] || ''
        } else if (item.elType === 'select') {
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
      this.formDataBackup = cloneDeep(formData)
      return formData
    },

    // Set default value
    setDefaultValue(data) {
      this.formData = this.getDefaultValue(data)
      this.$nextTick(() => {
        this.clearValidate()
      })
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

<style lang="scss">
.ele-card {
  .el-card__header {
    padding: 3px 20px !important;
    background-color: #ebeef5 !important;
  }
  .el-card__body {
    padding: 18px 0 0 !important;
  }
}

.ele-card + .ele-card {
  margin-top: 15px;
}

.card-title {
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  font-weight: bold;
}

.empty-block {
  margin-bottom: 18px;
  min-height: 32px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  .empty-text {
    font-size: 13px;
    line-height: 32px;
    width: 50%;
    color: #909399;
  }
}
</style>
