import Vue from 'vue'
import App from './App.vue'

import { Button, Select, Option, OptionGroup, Tag, Tooltip } from 'element-ui'
import { Container, Header, Aside, Main, Tree, Card, Popover } from 'element-ui'
import DemoTemplate from '../demo/demo.vue'

// element-ui config
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

// components
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Tag)
Vue.use(Tooltip)

// demo
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tree)
Vue.use(Card)
Vue.use(Popover)
Vue.component('DemoTemplate', DemoTemplate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
