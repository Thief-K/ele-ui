<template>
  <el-popover placement="bottom" width="300" style="line-height: 50px;">
    <el-form :model="settingForm" label-width="120px">
      <el-form-item :label="$t('homePage.language')">
        <el-select v-model="settingForm.lang">
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh-CN"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button type="success" @click="saveSetting"> {{ $t('homePage.save') }} </el-button>
    </div>
    <el-button slot="reference" type="primary" icon="el-icon-setting" circle></el-button>
  </el-popover>
</template>

<script>
import { getLang, setLang } from './utils/storage'

export default {
  data() {
    return {
      settingForm: {
        lang: getLang()
      }
    }
  },
  methods: {
    // Save setting
    saveSetting() {
      setLang(this.settingForm.lang)
      location.reload()
    }
  }
}
</script>
