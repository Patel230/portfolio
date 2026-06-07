import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '[data-reveal]') {
  let io = null

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('is-visible'))
      return
    }

    const els = document.querySelectorAll(selector)
    if (!els.length) return

    io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach(el => io.observe(el))
  })

  onUnmounted(() => {
    if (io) io.disconnect()
  })
}
