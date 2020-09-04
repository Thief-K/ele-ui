<template>
  <div>
    <demo-template>
      <template #title>Basic usage</template>
      <template #content>
        <EleButton>Button</EleButton>
        <p>Use like the official demo</p>
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>Tooltip</template>
      <template #content>
        <EleButton tooltip circle icon="el-icon-check"></EleButton>
      </template>
      <template #code>
        <CodeTooltip class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>Preset</template>
      <template #content>
        <EleButton type="delete">Button</EleButton>
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
