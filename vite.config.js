import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
const version = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}.${pad(now.getHours())}${pad(now.getMinutes())}`
const buildDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

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
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_DATE__: JSON.stringify(buildDate)
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
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    cssMinify: true,
    rollupOptions: {
      output: {
        // Function form required by Vite 8 (Rolldown); the object form is rejected.
        manualChunks(id) {
          if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/')) {
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
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
