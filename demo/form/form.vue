<template>
  <div>
    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleForm :items="items1" :default-value="defaultValue1" />
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('form.linkageForm') }}</template>
      <template #content>
        <EleForm :items="items2" :default-value="defaultValue2" />
      </template>
      <template #code>
        <CodeBasic class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('form.title') }}</template>
      <template #content>
        <EleForm :title="$t('form.title')" />
        <EleForm>
          <template #title>
            <span>{{ $t('form.title') }}</span>
          </template>
        </EleForm>
      </template>
      <template #code>
        <CodeTitle class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleForm ref="form" :items="items2" :default-value="defaultValue">
          <template #title>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <el-button type="primary" size="mini" @click="resetForm">{{ $t('form.reset') }}</el-button>
                <el-button type="primary" size="mini" @click="setDefaultValue">{{ $t('form.defaultValue') }}</el-button>
              </div>
              <div>
                <el-button type="success" size="mini" @click="submitForm">{{ $t('form.submit') }}</el-button>
              </div>
              <div>
                <el-button size="mini" @click="clearValidate">{{ $t('form.clearValidate') }}</el-button>
                <el-button size="mini" @click="clearSingleValidate">{{ $t('form.clearSingleValidate') }}</el-button>
              </div>
            </div>
          </template>
        </EleForm>
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
import CodeTitle from './code/code-title.md'
import './mock'

export default {
  components: { EleForm, CodeBasic, CodeTitle },
  data() {
    return {
      items1: [
        { prop: 'input', label: 'Input', elType: 'input' },
        { prop: 'number', label: 'Number', elType: 'number' },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name' }
      ],
      defaultValue1: {},
      items2: [
        {
          prop: 'select',
          label: 'Select',
          elType: 'select',
          options: [
            { value: '0', label: 'Close' },
            { value: '1', label: 'Open' }
          ],
          callback: this.handleChange
        },
        { prop: 'input', label: 'Input', elType: 'input', show: false }
      ],
      defaultValue2: {
        select: '0',
        input: 'Hello World'
      },
      items3: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true, range: [0, 100] } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } }
      ],
      defaultValue: {}
    }
  },
  methods: {
    handleChange(val) {
      this.items2[1].show = val === '1'
    },
    setDefaultValue() {
      this.defaultValue = {
        input: 'Hello World',
        number: 25,
        select: '02'
      }
    },
    resetForm() {
      this.$refs.form.resetFields({})
    },
    submitForm() {
      this.$refs.form.checkForm(data => {
        this.$alert(JSON.stringify(data), 'Form data')
      })
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    clearSingleValidate() {
      this.$refs.form.clearValidate(['input'])
    }
  }
}
</script>
