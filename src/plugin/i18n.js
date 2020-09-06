import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ElementLocale from 'element-ui/lib/locale'
import enElementLocale from 'element-ui/lib/locale/lang/en'
import zhCNElementLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocale from '../../demo/lang/en'
import zhCNLocale from '../../demo/lang/zh-CN'

// install
Vue.use(VueI18n)

// messages
const elementMessages = {
  ['en']: { ...enElementLocale },
  ['zh-CN']: { ...zhCNElementLocale }
}
const demoMessages = {
  ['en']: { ...enLocale },
  ['zh-CN']: { ...zhCNLocale }
}

// i18n
const elementI18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages: elementMessages
})
const demoI18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages: demoMessages
})

// element-ui
ElementLocale.i18n((key, value) => elementI18n.t(key, value))

export default demoI18n
