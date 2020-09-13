```vue
<template>
  <EleForm ref="form" :items="items" :default-value="defaultValue">
    <template #title>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <el-button size="mini" @click="clearValidate">Clear validate</el-button>
          <el-button size="mini" @click="clearSingleValidate">Clear single validate</el-button>
        </div>
        <div>
          <el-button size="mini" @click="resetForm">Reset</el-button>
          <el-button size="mini" @click="setDefaultValue">Default value</el-button>
        </div>
      </div>
    </template>
  </EleForm>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { prop: 'input', label: 'Input', elType: 'input', rules: { required: true } },
        { prop: 'number', label: 'Number', elType: 'number', rules: { required: true, range: [0, 100] } },
        { prop: 'select', label: 'Select', elType: 'select', dictCode: 'name', rules: { required: true } },
        { label: 'Submit', elType: 'button', type: 'primary', click: this.submitForm }
      ],
      defaultValue: {}
    }
  },
  methods: {
    clearValidate() {
      this.$refs.form.clearValidate()
    },

    clearSingleValidate() {
      this.$refs.form.clearValidate(['input'])
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
        // ...
      })
    }
  }
}
</script>
```