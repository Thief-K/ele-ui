<template>
  <el-select :value="value" v-bind="$attrs" @change="onChange">
    <!-- options -->
    <template v-if="newOptions.length">
      <el-option v-for="(option, index) in newOptions" v-bind="option" :key="index"></el-option>
    </template>
    <!-- groups -->
    <template v-else>
      <el-option-group v-for="group in newGroups" v-bind="group" :key="group.label">
        <el-option v-for="option in group.options" v-bind="option" :key="option.value"></el-option>
      </el-option-group>
    </template>
  </el-select>
</template>

<script>
// Select
export default {
  inheritAttrs: false,
  name: 'EleSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // value of select
    value: {
      type: [String, Array],
      required: false
    },
    // select options
    options: {
      type: Array,
      required: false
    },
    // group options
    groups: {
      type: Array,
      required: false
    },
    // data dictionary code
    dictCode: {
      type: String,
      required: false
    },
    // custom request
    request: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      newOptions: [],
      newGroups: []
    }
  },
  methods: {
    // Init options
    async init() {
      // Custom options
      if (this.options) {
        this.newOptions = this.options
      }
      // Custom groups
      if (this.groups) {
        this.newGroups = this.groups
      }
      // Data dictionary
      if (this.dictCode) {
        const { data } = await this.$http.get('/common/getDictCode', { code: this.dictCode })
        if (data) {
          this.newOptions = data
        }
      }
      // Custom request
      if (this.request) {
        const { data } = await this.$http.get(this.request.url, this.request.param)
        if (data) {
          const { type } = data
          if (type === 'options') {
            this.newOptions = data.data
          }
          if (type === 'groups') {
            this.newGroups = data.data
          }
        }
      }
    },

    // Triggered when value change
    onChange(val) {
      this.$emit('change', val)
    }
  },
  created() {
    this.init()
  },
  watch: {
    options() {
      this.init()
    },
    groups() {
      this.init()
    }
  }
}
</script>
