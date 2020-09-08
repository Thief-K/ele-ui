<template>
  <div>
    <demo-template>
      <template #title>{{ $t('common.basic') }}</template>
      <template #content>
        <EleForm ref="form" :items="items" :default-value="defaultValue">
          <template #title>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <el-button type="primary" size="mini" @click="resetForm">Reset</el-button>
                <el-button type="primary" size="mini" @click="setDefaultValue">Default value</el-button>
              </div>
              <div>
                <el-button type="success" size="mini" @click="submitForm">Submit</el-button>
              </div>
              <div>
                <el-button size="mini" @click="clearValidate">Clear validate</el-button>
                <el-button size="mini" @click="clearSingleValidate">Clear single validate</el-button>
              </div>
            </div>
          </template>
        </EleForm>
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
      items: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true, range: [0, 100] } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } }
      ],
      defaultValue: {}
    }
  },
  methods: {
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
