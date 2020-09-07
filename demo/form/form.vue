<template>
  <div>
    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleForm title="Table" :items="items" :default-value="defaultValue" />
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import EleForm from '../../src/components/form/form.vue'
import CodeBasic from './code/code-basic.md'
import './mock'

export default {
  components: { EleForm, CodeBasic },
  data() {
    return {
      items: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true, range: [0, 100] } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } }
      ],
      defaultValue: {
        input: 'Hello World',
        number: 25,
        select: '02'
      }
    }
  }
}
</script>
