import Vue from 'vue'

import DemoTemplate from '../../demo/demo.vue'
import { get } from '../utils/request'

// demo component
Vue.component('DemoTemplate', DemoTemplate)

// global method
Vue.prototype.$http = { get }
Vue.prototype.$system = { i18n: true }
