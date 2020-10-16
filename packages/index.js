import Select from './select/index.js'
import Button from './button/index.js'

// import i18nMixins from '../src/mixins/i18n'
// import validate from '../src/validate'

const components = [Select, Button]

const install = function(Vue) {
  // Vue.mixin(i18nMixins)
  // Vue.use(validate)

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Select,
  Button
}
