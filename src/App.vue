<template>
  <div id="app">
    <el-container class="container-wrap">
      <el-header class="container-header">
        <el-button type="text" class="expand-button" :icon="expandIcon" @click="navDrawer = true"></el-button>
        <img alt="logo" src="./assets/logo.png" style="cursor: pointer; height: 80%;" @click="onClickLogo" />
        <AppHeaderSetting />
      </el-header>
      <el-container>
        <el-aside class="main-aside">
          <AppNavItem @click="onClickNavItem" />
        </el-aside>
        <el-main>
          <component :is="component" :class="homepageClass"></component>
        </el-main>
      </el-container>
    </el-container>

    <el-drawer :visible.sync="navDrawer" direction="ltr" :show-close="false">
      <AppNavItem @click="onClickNavItem" />
    </el-drawer>

    <el-backtop :right="20" :bottom="20"></el-backtop>
  </div>
</template>

<script>
import AppHeaderSetting from './app-header-setting'
import AppNavItem from './app-nav-item'
import 'github-markdown-css'

export default {
  name: 'App',
  components: { AppHeaderSetting, AppNavItem },
  data() {
    return {
      navDrawer: false,
      component: null,
      homepageClass: ''
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
        this.homepageClass = 'markdown-body'
        component = () => import('../demo/home-page/index.vue')
      } else {
        this.homepageClass = ''
        component = () => import(`../demo/${item.id}/${item.id}.vue`)
      }
      this.component = component
      this.navDrawer = false
    },

    // Triggered when click the logo
    onClickLogo() {
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
  padding: 20px;
  border-right: 3px solid #eee;
}

.el-drawer {
  min-width: 180px;
  .el-drawer__header {
    display: none;
  }
  .el-drawer__body {
    padding: 20px;
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
