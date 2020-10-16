<template>
  <div>
    <template v-for="item in navItems">
      <div :key="item.id" class="nav-wrap">
        <span class="nav-label">{{ item.label }}</span>
        <ul class="nav-list">
          <template v-for="child in item.children">
            <li :key="child.id" class="nav-item">
              <span @click="onClick(child)">{{ child.label }}</span>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { getLang } from '../utils/storage'
import navItems from '../../demo/index.js'

export default {
  data() {
    return {
      navItems: navItems[getLang()]
    }
  },
  methods: {
    onClick(child) {
      this.$emit('click', child)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrap {
  .nav-label {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .nav-list {
    padding: 0 0 0 30px;
    list-style-type: none;
    .nav-item {
      height: 30px;
      line-height: 30px;
      color: #5f5f5f;
      font-size: 1.2rem;
      font-weight: 500;
      & > span {
        cursor: pointer;
      }
      & > span:hover,
      .active {
        color: #529b9e;
      }
    }
  }
}
</style>
