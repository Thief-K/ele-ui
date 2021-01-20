<template>
  <!-- button -->
  <el-button v-if="!tooltip" v-bind="attrs" @click="onClick">
    <slot></slot>
  </el-button>

  <!-- tooltip -->
  <el-tooltip v-else :disabled="!content" :open-delay="300" placement="top" :enterable="false">
    <template #content>
      <span v-text="content"></span>
    </template>
    <el-button v-bind="attrs" @click="onClick"></el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import preset from './preset'

// Button
export default defineComponent({
  name: 'EleButton',
  inheritAttrs: false,
  props: {
    // whether the text will be shown in the tooltip
    tooltip: {
      type: Boolean,
      required: false
    }
  },
  emits: ['click'],
  setup: (_, context) => {
    const attrs = computed(() => {
      return Object.assign({}, context.attrs, preset[context.attrs.type as string])
    })

    const content = computed(() => {
      return context.slots.default?.()[0].children
    })

    // Triggered when click button
    const onClick = (event: any) => {
      context.emit('click', event)
    }

    return { attrs, content, onClick }
  }
})
</script>
