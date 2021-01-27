import { createApp } from 'vue'
import App from './App.vue'

import i18n from './plugin/i18n'

// import ElButton from 'element-plus/lib/el-button'
// import ElTooltip from 'element-plus/lib/el-tooltip'
// import 'element-plus/lib/theme-chalk/el-icon.css'
// import 'element-plus/lib/theme-chalk/el-popper.css'
// import 'element-plus/lib/theme-chalk/el-button.css'
// import 'element-plus/lib/theme-chalk/el-tooltip.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'

import EleButton from '../packages/button/lib/button.es.js'

// createApp(App).use(ElButton).use(ElTooltip).use(EleButton).mount('#app')
createApp(App)
  .use(ElementPlus, {
    i18n: i18n.global.t
  })
  .use(EleButton)
  .use(i18n)
  .mount('#app')
