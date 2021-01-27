<template>
  <el-popover placement="bottom" width="300" style="line-height: 50px">
    <el-form :model="settingForm" label-width="120px">
      <el-form-item :label="$t('homePage.language')">
        <el-select v-model="settingForm.lang">
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh-cn"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="success" @click="saveSetting"> {{ $t('homePage.save') }} </el-button>
    </div>
    <template #reference>
      <el-button type="primary" icon="el-icon-setting" circle></el-button>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getLang, setLang } from '../utils/storage'

export default defineComponent({
  setup: () => {
    const settingForm = reactive({
      lang: getLang()
    })

    const saveSetting = () => {
      setLang(settingForm.lang)
      location.reload()
    }
    return { settingForm, saveSetting }
  }
})
</script>
