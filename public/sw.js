// __APP_VERSION__ is replaced at build time so each deploy gets a fresh cache
const CACHE_NAME = 'portfolio-__APP_VERSION__'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/icons/favicon.svg',
  '/lakshman.jpg'
]

// Install event - cache static assets. Do NOT skipWaiting here: the new worker
// must stay in "waiting" so UpdatePrompt can offer the update to the user.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
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

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith(self.location.origin)) return

  const url = new URL(event.request.url)

  // API responses must never be cached (the visit counter would go stale and
  // double-count), and full-size gallery images would bloat Cache Storage.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/images/gallery/')) {
    return
  }

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
