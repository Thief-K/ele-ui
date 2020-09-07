import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ElementLocale from 'element-ui/lib/locale'
import enElementLocale from 'element-ui/lib/locale/lang/en'
import zhCNElementLocale from 'element-ui/lib/locale/lang/zh-CN'

import enDemoLocale from '../../demo/locale/en'
import zhCNDemoLocale from '../../demo/locale/zh-CN'

import enRuleLocale from '../locale/rule/en'
import zhCNRuleLocale from '../locale/rule/zh-CN'

// install
Vue.use(VueI18n)

// messages
const elementMessages = {
  ['en']: { ...enElementLocale },
  ['zh-CN']: { ...zhCNElementLocale }
}
const demoMessages = {
  ['en']: { ...enDemoLocale, ...enRuleLocale },
  ['zh-CN']: { ...zhCNDemoLocale, ...zhCNRuleLocale }
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
