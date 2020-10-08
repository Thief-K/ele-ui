<template>
  <div id="app">
    <el-container class="container-wrap">
      <el-header class="container-header">
        <el-button type="text" class="expand-button" :icon="expandIcon" @click="navDrawer = true"></el-button>
        <!-- <img alt="logo" src="./assets/logo.png" style="cursor: pointer; height: 100%;" /> -->
        <el-popover placement="bottom" width="300" style="line-height: 50px;">
          <el-form :model="settingForm" label-width="120px">
            <el-form-item :label="$t('homePage.language')">
              <el-select v-model="settingForm.lang">
                <el-option label="English" value="en"></el-option>
                <el-option label="中文" value="zh-CN"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align: center;">
            <el-button type="success" @click="saveSetting"> {{ $t('homePage.save') }} </el-button>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-setting" circle></el-button>
        </el-popover>
      </el-header>
      <el-container class="container-main">
        <el-aside class="main-aside">
          <NavItem :nav-items="navItems" @click="onClickNavItem" />
        </el-aside>
        <el-main>
          <component :is="component"></component>
        </el-main>
      </el-container>
    </el-container>

    <el-drawer :visible.sync="navDrawer" direction="ltr" :show-close="false">
      <NavItem :nav-items="navItems" @click="onClickNavItem" />
    </el-drawer>
    <!-- <el-backtop target=".el-container"></el-backtop> -->
  </div>
</template>

<script>
import { getLang, setLang } from './utils/storage'
import NavItem from './nav-item'
import navItems from '../demo/index.js'
import 'github-markdown-css'

export default {
  name: 'App',
  components: { NavItem },
  data() {
    return {
      settingForm: {
        lang: getLang()
      },
      navItems: navItems[getLang()],
      navDrawer: false,
      component: null
    }
  },
  computed: {
    expandIcon() {
      return this.navDrawer ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    }
  },
  methods: {
    // Triggered when click navigation bar item
    onClickNavItem(item) {
      const items = document.querySelectorAll('.nav-item')
      items.forEach(e => {
        const firstChild = e.firstChild
        if (firstChild.innerText === item.label) {
          firstChild.className = 'active'
        } else {
          firstChild.className = ''
        }
      })
      let component = null
      if (item === null) {
        component = () => import('../demo/home-page/index.vue')
      } else {
        component = () => import(`../demo/${item.id}/${item.id}.vue`)
      }
      this.component = component
      this.navDrawer = false
    },

    // Save setting
    saveSetting() {
      setLang(this.settingForm.lang)
      location.reload()
    }
  },
  created() {
    this.onClickNavItem(null)
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (min-width: 960px) {
  #app {
    width: 70%;
    min-width: 960px;
    margin: 0 auto;
  }
  .expand-button {
    visibility: hidden;
  }
}

@media screen and (max-width: 960px) {
  .main-aside {
    display: none;
  }
}

.container-wrap {
  min-height: calc(100vh - 16px);
}

.container-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #eee;
  .expand-button {
    font-size: 2rem;
  }
}

.container-main {
  .main-aside {
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.1);
}

.el-aside {
  padding: 10px;
  border-right: 3px solid #eee;
}

.el-main {
  padding: 20px 50px;
}

.el-drawer {
  min-width: 180px;
  .el-drawer__header {
    display: none;
  }
  .el-drawer__body {
    padding: 10px;
  }
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin: 0px;
}

.el-popover > .markdown-body {
  max-height: 620px;
  overflow-y: auto;
}
</style>
