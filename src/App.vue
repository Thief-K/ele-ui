<template>
  <el-container class="container-wrap">
    <el-header class="container-header">
      <el-button type="text" class="expand-button" :icon="expandIcon" @click="navDrawer = true"></el-button>
      <img alt="logo" src="./assets/logo.png" style="cursor: pointer; height: 80%" @click="onClickLogo" />
      <AppHeaderSetting />
    </el-header>
    <el-container>
      <el-aside class="main-aside">
        <AppNavItem @click="onClickNavItem" />
      </el-aside>
      <el-main style="padding: 32px 52px">
        <component :is="component" :class="homepageClass"></component>
      </el-main>
    </el-container>
  </el-container>

  <el-drawer v-model:visible="navDrawer" direction="ltr" :show-close="false">
    <AppNavItem @click="onClickNavItem" />
  </el-drawer>

  <el-backtop :right="20" :bottom="20"></el-backtop>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent, computed } from 'vue'
import AppHeaderSetting from './components/app-header-setting.vue'
import AppNavItem from './components/app-nav-item.vue'

export default defineComponent({
  name: 'App',
  components: { AppHeaderSetting, AppNavItem },
  setup: () => {
    const navDrawer = ref(false)
    let component = defineAsyncComponent(() => import('../web/home-page/index.vue'))
    const homepageClass = ref('')

    const expandIcon = computed(() => {
      return navDrawer.value ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    })

    // Triggered when click navigation bar item
    const onClickNavItem = (item: any) => {
      const items = document.querySelectorAll('.nav-item')
      items.forEach((e) => {
        const firstChild = e.firstChild as HTMLElement
        if (firstChild.innerText === item.label) {
          firstChild.className = 'active'
        } else {
          firstChild.className = ''
        }
      })
      if (item === null) {
        homepageClass.value = 'markdown-body'
        component = defineAsyncComponent(() => import('../web/home-page/index.vue'))
      } else {
        homepageClass.value = ''
        component = defineAsyncComponent(() => import(`../web/${item.id}/${item.id}.vue`))
      }
      navDrawer.value = false
    }

    // Triggered when click the logo
    const onClickLogo = () => {
      location.reload()
    }

    onClickNavItem(null)

    return { navDrawer, component, homepageClass, expandIcon, onClickNavItem, onClickLogo }
  }
})
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
  padding: 32px;
  border-right: 1px solid #eee;
  box-shadow: 4px 0px 7px #e8e8e8;
  z-index: 1;
}

.el-drawer {
  min-width: 180px;
  .el-drawer__header {
    display: none;
  }
  .el-drawer__body {
    padding: 32px;
  }
}

.el-popover > .markdown-body {
  max-height: 620px;
  overflow-y: auto;
}
</style>
