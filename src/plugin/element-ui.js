import Vue from 'vue'

import {
  Button,
  Select,
  Option,
  OptionGroup,
  Tag,
  Tooltip,
  Form,
  FormItem,
  Input,
  InputNumber,
  Loading,
  Table,
  TableColumn,
  Pagination,
  Switch
} from 'element-ui'
import { Container, Header, Aside, Main, Card, Popover, Drawer, Backtop, Icon, MessageBox } from 'element-ui'

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
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Loading.directive)

// demo
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Card)
Vue.use(Popover)
Vue.use(Drawer)
Vue.use(Backtop)
Vue.use(Icon)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
