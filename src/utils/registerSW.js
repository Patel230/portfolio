/**
 * Register Service Worker for PWA support
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registered:', registration.scope)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, show refresh prompt
                console.log('[SW] New content available, please refresh')
                // Could dispatch an event here to show UI notification
                window.dispatchEvent(new CustomEvent('sw-update', { detail: newWorker }))
              }
            })
          })
        })
        .catch((error) => {
          console.log('[SW] Registration failed:', error)
        })
    })
  }
}

/**
 * Unregister Service Worker (for development)
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    })
  }
}
