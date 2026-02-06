import { ref, onMounted, onUnmounted, readonly } from 'vue'

export function useScrollSpy(sectionIds, options = {}) {
  const activeSection = ref('')
  const { offset = 100, threshold = 0.2 } = options

  let observer = null
  let scrollHandler = null

  onMounted(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: use scroll event
      scrollHandler = () => {
        const scrollPosition = window.scrollY + offset

        for (const id of sectionIds) {
          const element = document.getElementById(id)
          if (element) {
            const top = element.offsetTop
            const height = element.offsetHeight

            if (scrollPosition >= top && scrollPosition < top + height) {
              activeSection.value = id
              break
            }
          }
        }
      }

      window.addEventListener('scroll', scrollHandler, { passive: true })
      scrollHandler()

      return
    }

    // Use IntersectionObserver for better performance
    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`,
      threshold
    }

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, observerOptions)

    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return readonly(activeSection)
}
