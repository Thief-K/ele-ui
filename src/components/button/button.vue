<template>
  <!-- button -->
  <el-button v-if="!tooltip" v-bind="attrs" v-on="listeners">
    <slot></slot>
  </el-button>

  <!-- tooltip -->
  <el-tooltip v-else :disabled="!content" :open-delay="300" placement="top" :enterable="false">
    <template #content>
      <span v-html="content"></span>
    </template>
    <el-button v-bind="attrs" v-on="listeners"></el-button>
  </el-tooltip>
</template>

<script>
import preset from './preset'

export default {
  inheritAttrs: false,
  props: {
    // the text will be shown in the tooltip
    tooltip: Boolean
  },
  computed: {
    attrs() {
      return Object.assign(this.$attrs, preset[this.$attrs.type])
    },
    content() {
      return this.$slots.default?.[0].text
    },
    listeners() {
      return {
        // triggered when click button
        // @arg native event
        click: event => this.$emit('click', event)
      }
    }
  }
}
</script>
