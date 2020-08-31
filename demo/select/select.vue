<template>
  <div>
    <demo-template>
      <template #title>基础用法</template>
      <template #content>
        <Select v-model="value" :options="options" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>基础用法</template>
      <template #content>
        <Select v-model="value" :options="options" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import Select from '../../src/components/select/select.vue'

export default {
  components: { Select },
  data() {
    return {
      value: '',
      options: [
        { value: '1', label: 'A' },
        { value: '2', label: 'B' },
        { value: '3', label: 'C' }
      ]
    }
  }
}
</script>
