```vue
<template>
  <EleForm ref="form" :items="items" :default-value="defaultValue" />
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          prop: 'country',
          label: 'Country',
          elType: 'select',
          clearable: true,
          options: [
            { value: 'cn', label: 'China' },
            { value: 'us', label: 'America' }
          ],
          callback: this.handleCountryChange
        },
        {
          prop: 'city',
          label: 'City',
          elType: 'select',
          clearable: true,
          show: false,
          options: [],
          callback: this.handleCityChange
        },
        { prop: 'address', label: 'Address', elType: 'input', show: false }
      ]，
      defaultValue: {}
    }
  },
  methods: {
    handleCountryChange(val) {
      this.items[1].show = val !== ''
      if (val === 'cn') {
        this.items[1].options = [
          { value: '3040', label: 'Chang Zhou' },
          { value: '3310', label: 'Hang Zhou' },
          { value: '5210', label: 'Wu Han' }
        ]
      }
      if (val === 'us') {
        this.items[1].options = [
          { value: 'dc', label: 'Washington D.C' },
          { value: 'ny', label: 'New York' }
        ]
      }
      this.defaultValue = Object.assign(this.$refs.form.getFormData(), { city: '' })
      this.handleCityChange('')
    },

    handleCityChange(val) {
      this.items[2].show = val !== ''
    }
  }
}
</script>
```