import Vue from 'vue'
import App from './App.vue'

import i18n from './plugin/i18n'
import './plugin/element-ui'
import './plugin/demo'

Vue.config.productionTip = false

new Vue({
  i18n: i18n,
  render: h => h(App)
}).$mount('#app')
