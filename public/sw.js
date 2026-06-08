const CACHE_NAME = 'portfolio-v2'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/icons/favicon.svg',
  '/lakshman.jpg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache or network
// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith(self.location.origin)) return

  // HTML navigations: network-first with offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cache = response.clone()
          caches.open(CACHE_NAME).then((c) => c.put(event.request, cache))
          return response
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  // Static assets: stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const cache = response.clone()
            caches.open(CACHE_NAME).then((c) => c.put(event.request, cache))
          }
          return response
        })
        .catch(() => cached)
      return cached || fetchPromise
    })
  )
})
