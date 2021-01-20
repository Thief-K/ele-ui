import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'
import markdownIt from './build/markdown'

export default defineConfig({
  plugins: [vue(), markdown({ mode: [Mode.VUE], markdownIt })],
  optimizeDeps: {
    include: ['element-plus/lib/el-button', 'element-plus/lib/el-tooltip']
    // exclude: ['element-plus']
  }
})
