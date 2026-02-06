import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = options

  const elementRef = ref(null)
  const isVisible = ref(false)
  let observer = null

  const handleIntersect = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (once && observer) {
          observer.unobserve(entry.target)
        }
      } else if (!once) {
        isVisible.value = false
      }
    })
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin
    })

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isVisible
  }
}
