import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'

const version = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'manifest-version-injector',
      enforce: 'pre',
      transformIndexHtml(html) {
        return html.replace(/__APP_VERSION__/g, version)
      }
    }
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3686,
    host: true,
    open: false
  },
  optimizeDeps: {
    include: ['url']
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    sourcemap: false,
    reportCompressedSize: false
  },
  preview: {
    port: 4173,
    host: true
  },
  css: {
    devSourcemap: true
  }
})
