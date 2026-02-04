import { ref, onMounted, onUnmounted, readonly } from 'vue'

// Cache for media queries to avoid creating multiple listeners for same query
const mediaQueryCache = new Map()

export function useMediaQuery(query) {
  const matches = ref(false)
  let mediaQuery = null
  let handler = null

  onMounted(() => {
    // Check if we already have this query cached
    if (mediaQueryCache.has(query)) {
      const cached = mediaQueryCache.get(query)
      matches.value = cached.matches
      
      // Add to subscribers
      cached.subscribers.add(updateValue)
      return
    }

    mediaQuery = window.matchMedia(query)
    matches.value = mediaQuery.matches

    handler = (event) => {
      matches.value = event.matches
    }

    // Cache this media query
    const cacheEntry = {
      matches: mediaQuery.matches,
      mql: mediaQuery,
      subscribers: new Set([handler])
    }
    mediaQueryCache.set(query, cacheEntry)

    // Use addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
    }
  })

  const updateValue = (event) => {
    matches.value = event.matches
  }

  onUnmounted(() => {
    if (handler && mediaQuery) {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        mediaQuery.removeListener(handler)
      }
    }
    
    // Remove from cache subscribers
    if (mediaQueryCache.has(query)) {
      const cached = mediaQueryCache.get(query)
      cached.subscribers.delete(handler)
      
      // Clean up cache if no more subscribers
      if (cached.subscribers.size === 0) {
        mediaQueryCache.delete(query)
      }
    }
  })

  return readonly(matches)
}

// Common breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
