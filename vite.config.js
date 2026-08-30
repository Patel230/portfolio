import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const now = new Date()

// Auto-version: major.minor from package.json, patch = git commit count.
// Falls back to the plain package.json version when git is unavailable
// (e.g. a Docker build context without .git).
let appVersion
try {
  const gitCount = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim()
  const pkgVersion = JSON.parse(
    execSync('git show HEAD:package.json', { encoding: 'utf-8' })
  ).version
  const [major, minor] = pkgVersion.split('.').slice(0, 2)
  appVersion = `${major}.${minor}.${gitCount}`
} catch {
  appVersion = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')).version
}

// Human date/time
const timeFmt = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
const dateFmt = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
const buildLabel = `${dateFmt} ${timeFmt}`

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'version-injector',
      enforce: 'pre',
      transformIndexHtml(html) {
        return html.replace(/__APP_VERSION__/g, appVersion)
      },
      // sw.js and manifest.json live in public/ and are copied verbatim, so
      // their __APP_VERSION__ placeholders must be rewritten after the build.
      closeBundle() {
        for (const file of ['dist/sw.js', 'dist/manifest.json']) {
          const path = resolve(__dirname, file)
          if (existsSync(path)) {
            writeFileSync(path, readFileSync(path, 'utf-8').replace(/__APP_VERSION__/g, appVersion))
          }
        }
      }
    }
  ],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __BUILD_DATE__: JSON.stringify(buildLabel)
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
