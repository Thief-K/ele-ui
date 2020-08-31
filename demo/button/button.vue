<template>
  <div>
    <demo-template>
      <template #title>基础用法</template>
      <template #content>
        <Button>Button</Button>
      </template>
    </demo-template>
  </div>
</template>

<script>
import Button from '../../src/components/button/button.vue'

export default {
  components: { Button }
}
</script>
