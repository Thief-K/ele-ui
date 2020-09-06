import Vue from 'vue'

import { Button, Select, Option, OptionGroup, Tag, Tooltip, Form, FormItem } from 'element-ui'
import { Container, Header, Aside, Main, Tree, Card, Popover } from 'element-ui'

// config
Vue.prototype.$ELEMENT = { size: 'small' }

// components
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)

// demo
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tree)
Vue.use(Card)
Vue.use(Popover)
