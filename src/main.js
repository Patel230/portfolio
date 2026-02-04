import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerServiceWorker } from './utils/registerSW.js'
import './style.css'

// Register Service Worker for PWA support (production only)
if (import.meta.env.PROD) {
  registerServiceWorker()
}

// Console easter egg
console.log(
  '%c👋 Hey there, curious developer!\n%cCheck out my code at: https://github.com/Patel230\n%cHappy coding! 🚀',
  'color: #fbbf24; font-size: 18px; font-weight: bold; padding: 8px;',
  'color: #a3a3a3; font-size: 14px; padding: 4px;',
  'color: #22c55e; font-size: 14px; font-style: italic; padding: 4px;'
)

/**
 * Hide the initial loading screen
 */
const hideLoadingScreen = () => {
  const loader = document.getElementById('loading-screen')
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden')
  }
}

/**
 * Handle errors gracefully - ensure loader is hidden
 */
const handleError = () => {
  console.error('Application error occurred')
  hideLoadingScreen()
}

// Create and mount Vue app
const app = createApp(App)

app.use(router)

// Mount the app
app.mount('#app')

// Hide loader after mount (Vue is ready)
hideLoadingScreen()

// Global error handlers to ensure loader is always hidden
window.addEventListener('error', handleError)
window.addEventListener('unhandledrejection', handleError)
