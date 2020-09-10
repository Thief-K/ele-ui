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
        <EleForm ref="form1" :items="items2" :default-value="defaultValue2" />
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
      <template #title>{{ $t('form.fullFunction') }}</template>
      <template #content>
        <EleForm ref="form2" :items="items3" :default-value="defaultValue">
          <template #title>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <el-button size="mini" @click="clearValidate">{{ $t('form.clearValidate') }}</el-button>
                <el-button size="mini" @click="clearSingleValidate">{{ $t('form.clearSingleValidate') }}</el-button>
              </div>
              <div>
                <el-button size="mini" @click="resetForm">{{ $t('form.reset') }}</el-button>
                <el-button size="mini" @click="setDefaultValue">{{ $t('form.defaultValue') }}</el-button>
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
          prop: 'country',
          label: 'Country',
          elType: 'select',
          clearable: true,
          options: [
            { value: 'cn', label: 'China' },
            { value: 'us', label: 'America' }
          ],
          callback: this.linkageChange1
        },
        {
          prop: 'city',
          label: 'City',
          elType: 'select',
          clearable: true,
          show: false,
          options: [],
          callback: this.linkageChange2
        },
        { prop: 'address', label: 'Address', elType: 'input', show: false },
        { label: 'Submit', elType: 'button', type: 'primary', click: () => this.submitForm('form1') }
      ],
      defaultValue2: {},
      items3: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true, range: [0, 100] } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } },
        { label: 'Submit', elType: 'button', type: 'primary', click: () => this.submitForm('form2') }
      ],
      defaultValue: {}
    }
  },
  methods: {
    linkageChange1(val) {
      this.items2[1].show = val !== ''
      if (val === 'cn') {
        this.items2[1].options = [
          { value: '3040', label: 'Chang Zhou' },
          { value: '3310', label: 'Hang Zhou' },
          { value: '5210', label: 'Wu Han' }
        ]
      }
      if (val === 'us') {
        this.items2[1].options = [
          { value: 'dc', label: 'Washington D.C' },
          { value: 'ny', label: 'New York' }
        ]
      }
      this.defaultValue2 = Object.assign(this.$refs.form1.getFormData(), { city: '' })
      this.linkageChange2('')
    },
    linkageChange2(val) {
      this.items2[2].show = val !== ''
    },
    setDefaultValue() {
      this.defaultValue = {
        input: 'Hello World',
        number: 25,
        select: '02'
      }
    },
    resetForm() {
      this.$refs.form2.resetFields({})
    },
    submitForm(form) {
      this.$refs[form].checkForm(data => {
        const json = JSON.stringify(data, null, 2)
        this.$msgbox({ title: 'Form data', message: <pre>{json}</pre> })
      })
    },
    clearValidate() {
      this.$refs.form2.clearValidate()
    },
    clearSingleValidate() {
      this.$refs.form2.clearValidate(['input'])
    }
  }
}
</script>
