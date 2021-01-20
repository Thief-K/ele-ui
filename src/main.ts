import { createApp } from 'vue'
import App from './App.vue'

import ElButton from 'element-plus/lib/el-button'
import ElTooltip from 'element-plus/lib/el-tooltip'
import 'element-plus/lib/theme-chalk/el-icon.css'
import 'element-plus/lib/theme-chalk/el-popper.css'
import 'element-plus/lib/theme-chalk/el-button.css'
import 'element-plus/lib/theme-chalk/el-tooltip.css'

import EleButton from '../packages/button/lib/button.es.js'

createApp(App).use(ElButton).use(ElTooltip).use(EleButton).mount('#app')
