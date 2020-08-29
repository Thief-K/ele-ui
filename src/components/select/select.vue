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
export default {
  inheritAttrs: false,
  name: 'EleSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // value of select
    value: [String, Array],
    // select options
    options: [Array],
    // group options
    groups: [Array],
    // data dictionary code
    dictCode: String,
    // custom request
    request: Object
  },
  data() {
    return {
      newOptions: [],
      newGroups: []
    }
  },
  methods: {
    // init options
    async init() {
      // custom options
      if (this.options) {
        this.newOptions = this.options
      }
      // custom groups
      if (this.groups) {
        this.newGroups = this.groups
      }
      // data dictionary
      if (this.dictCode) {
        const { data } = await this.$http.get('/common/getDictCode', { code: this.dictCode })
        if (data) {
          this.newOptions = data
        }
      }
      // custom request
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

    // triggered when value change
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
