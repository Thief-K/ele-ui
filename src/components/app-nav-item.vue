<template>
  <div>
    <template v-for="item in navItems" :key="item.id">
      <div class="nav-wrap">
        <span class="nav-label">{{ item.label }}</span>
        <ul class="nav-list">
          <template v-for="child in item.children" :key="child.id">
            <li class="nav-item">
              <span @click="onClick(child)">{{ child.label }}</span>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLang } from '../utils/storage'
import navItems from '../../web/index.ts'

export default defineComponent({
  emits: ['click'],
  setup: (_, context) => {
    const onClick = (child: any) => {
      context.emit('click', child)
    }
    return { onClick }
  },
  data() {
    return {
      navItems: navItems[getLang()]
    }
  }
})
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
