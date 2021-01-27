import { createI18n } from 'vue-i18n'

import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

import enWebLocale from '../../web/locale/en'
import zhWebLocale from '../../web/locale/zh-cn'

const messages = {
  [enLocale.name]: {
    el: enLocale.el,
    message: { ...enWebLocale }
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    message: { ...zhWebLocale }
  }
}

const i18n = createI18n({
  locale: zhLocale.name,
  fallbackLocale: enLocale.name,
  messages
})

export default i18n
