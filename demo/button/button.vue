<template>
  <div>
    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleButton>{{ $t('button.button') }}</EleButton>
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('button.tooltip') }}</template>
      <template #content>
        <EleButton tooltip circle icon="el-icon-check">{{ $t('button.button') }}</EleButton>
      </template>
      <template #code>
        <CodeTooltip class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('button.preset') }}</template>
      <template #content>
        <EleButton type="delete">{{ $t('button.button') }}</EleButton>
      </template>
      <template #code>
        <CodePreset class="markdown-body" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import EleButton from '../../src/components/button/button.vue'
import CodeBasic from './code/code-basic.md'
import CodeTooltip from './code/code-tooltip.md'
import CodePreset from './code/code-preset.md'

export default {
  components: { EleButton, CodeBasic, CodeTooltip, CodePreset }
}
</script>
