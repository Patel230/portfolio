import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '[data-reveal]') {
  let io = null
  let mo = null

  function observe(el) {
    if (el._revealed) return
    io.observe(el)
  }

  function scanAndObserve() {
    document.querySelectorAll(selector).forEach(observe)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('is-visible'))
      return
    }

    io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            entry.target._revealed = true
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    scanAndObserve()

    // Only scan nodes actually added by each mutation — a full-document
    // querySelectorAll on every DOM change is O(page) for the app's lifetime
    mo = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue
          if (node.matches?.(selector)) observe(node)
          node.querySelectorAll?.(selector).forEach(observe)
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (io) io.disconnect()
    if (mo) mo.disconnect()
  })
}
