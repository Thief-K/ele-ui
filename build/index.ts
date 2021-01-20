const path = require('path')
const { build, defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

;(async () => {
  const config = defineConfig({
    root: path.join(process.cwd(), 'packages', 'button'),
    build: {
      outDir: path.join(process.cwd(), 'packages', 'button', 'lib'),
      lib: {
        entry: path.join(process.cwd(), 'packages', 'button', 'index.ts'),
        name: 'button',
        formats: ['es']
      },
      minify: false,
      sourcemap: false,
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue']
      }
    },
    plugins: [vue()]
  })

  await build(config)
})()
