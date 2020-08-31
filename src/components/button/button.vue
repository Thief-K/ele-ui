<template>
  <!-- button -->
  <el-button v-if="!tooltip" v-bind="attrs" @click="onClick">
    <slot></slot>
  </el-button>

  <!-- tooltip -->
  <el-tooltip v-else :disabled="!content" :open-delay="300" placement="top" :enterable="false">
    <template #content>
      <span v-html="content"></span>
    </template>
    <el-button v-bind="attrs" @click="onClick"></el-button>
  </el-tooltip>
</template>

<script>
import preset from './preset'

// Select
export default {
  inheritAttrs: false,
  name: 'EleButton',
  props: {
    // whether the text will be shown in the tooltip
    tooltip: Boolean
  },
  computed: {
    attrs() {
      return Object.assign(this.$attrs, preset[this.$attrs.type])
    },
    content() {
      return this.$slots.default?.[0].text
    }
  },
  methods: {
    // triggered when click button
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
