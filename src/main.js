import Vue from 'vue'
import App from './App.vue'

import { Button, Tooltip } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Tooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
