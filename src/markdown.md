# Ele UI

> UI components based on Element UI

## Usage

### Install

```shell
npm intall ele-ui-vue
```

### Import

```javascript
// main.js
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
import EleUI from 'ele-ui-vue'

Vue.use(ElementUI)
Vue.use(EleUI)
```

***Also you can import these components on demand!***

### Config

```javascript
Vue.prototype.$ELEMENT = { size: 'small' } // component size
Vue.prototype.$http = { get: getMethod, post: postMethod } // http request
Vue.prototype.$system = { lang: 'en', i18n: true } // auto i18n request
```

### Global

- `this.$http`: http request
  - `this.$http.get`: http get
  - `this.$http.post`: http post
- `this.$system`: system variable
  - `this.$system.lang`: language (`String`)
  - `this.$system.i18n`: i18n (`Boolean`)

## Components

- Button
- Select
- Form
- Table

## TODO

- [x] I18n
- [x] Table - virtual scroll
- [x] Mobile adaptation
- [x] Logo
- [x] Component i18n request
- [ ] Unit test
- [ ] Promise collector in Form
- [x] Publish
- [ ] API document