<template>
  <div>
    <demo-template>
      <template #title>Options</template>
      <template #content>
        <EleSelect v-model="value1" :options="options" />
      </template>
      <template #code>
        <CodeOptions class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>Groups</template>
      <template #content>
        <EleSelect v-model="value2" :groups="groups" />
      </template>
      <template #code>
        <CodeGroups class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>Data dictionary</template>
      <template #content>
        <EleSelect v-model="value3" dictCode="name" />
        <p class="markdown-body">The default request url is <code>/common/getDictCode</code></p>
      </template>
      <template #code>
        <CodeDataDict class="markdown-body" />
      </template>
    </demo-template>

    <demo-template>
      <template #title>Custom request</template>
      <template #content>
        <EleSelect v-model="value4" :request="request" />
        <p class="markdown-body">
          The response body should like
          <code> { type: 'options | groups', data: [] } </code>
        </p>
      </template>
      <template #code>
        <CodeRequest class="markdown-body" />
      </template>
    </demo-template>
  </div>
</template>

<script>
import EleSelect from '../../src/components/select/select.vue'
import CodeOptions from './code/code-options.md'
import CodeGroups from './code/code-groups.md'
import CodeDataDict from './code/code-data-dict.md'
import CodeRequest from './code/code-request.md'
import './mock'

export default {
  components: { EleSelect, CodeOptions, CodeGroups, CodeDataDict, CodeRequest },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      options: [
        { value: '1', label: 'Option1' },
        { value: '2', label: 'Option2' },
        { value: '3', label: 'Option3' },
        { value: '4', label: 'Option4' },
        { value: '5', label: 'Option5' }
      ],
      groups: [
        {
          label: 'Group1',
          options: [
            { value: '1', label: 'Option1' },
            { value: '2', label: 'Option2' }
          ]
        },
        {
          label: 'Group2',
          options: [
            { value: '3', label: 'Option3' },
            { value: '4', label: 'Option4' },
            { value: '5', label: 'Option5' }
          ]
        }
      ],
      request: {
        url: '/common/select',
        param: {}
      }
    }
  }
}
</script>
