<template>
  <div id="app">
    <el-container class="container-wrap">
      <el-header height="42px">
        <!-- <img alt="logo" src="./assets/logo.png" style="cursor: pointer; height: 100%;" /> -->
        <el-button type="primary" icon="el-icon-setting" circle></el-button>
      </el-header>
      <el-container class="container-main">
        <el-aside>
          <el-tree
            ref="componentTree"
            :data="treeData"
            node-key="id"
            default-expand-all
            highlight-current
            :expand-on-click-node="false"
            @node-click="onNodeClick"
          >
          </el-tree>
        </el-aside>
        <el-main>
          <component class="markdown-body" :is="component"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import treeData from '../demo/index.js'
import 'github-markdown-css'

export default {
  name: 'App',
  data() {
    return {
      treeData: treeData['en'],
      component: null
    }
  },
  methods: {
    // triggered when click node
    onNodeClick(node) {
      let component = null
      if (node === null) {
        component = () => import('../demo/index.vue')
      } else {
        if (node.disabled) {
          return
        }
        component = () => import(`../demo/${node.id}/${node.id}.vue`)
      }
      this.component = component
    }
  },
  created() {
    this.onNodeClick(null)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 70%;
  min-width: 1200px;
  margin: 0 auto;
}

.container-wrap {
  height: calc(100vh - 16px);
}

.container-main {
  height: calc(100vh - 58px);
}

.el-header {
  height: 42px;
  text-align: right;
  border-bottom: 3px solid #eee;
}

.el-aside {
  padding: 10px;
  border-right: 3px solid #eee;
  .el-tree-node__label {
    font-size: 16px;
    font-weight: bold;
  }
}

.el-main {
  padding: 20px 50px;
}
</style>
