import { ref, onMounted, onUnmounted } from 'vue'
import { prefersReducedMotion } from '@/utils/motion.js'

export function useTypingEffect(
  roles,
  {
    startDelay = 500,
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseDuration = 2000,
    resumeDelay = 500
  } = {}
) {
  const displayText = ref('')
  const showCursor = ref(true)

  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeTimeout = null
  let cursorTimeout = null

  const typeEffect = () => {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      displayText.value = currentRole.substring(0, charIndex - 1)
      charIndex--
    } else {
      displayText.value = currentRole.substring(0, charIndex + 1)
      charIndex++
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseDuration
      isDeleting = true
      showCursor.value = false
      cursorTimeout = setTimeout(() => {
        showCursor.value = true
      }, 100)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      delay = resumeDelay
    }

    typeTimeout = setTimeout(typeEffect, delay)
  }

  onMounted(() => {
    // CSS can't stop a setTimeout loop — honor reduced motion in JS too
    if (prefersReducedMotion()) {
      displayText.value = roles[0]
      return
    }
    typeTimeout = setTimeout(typeEffect, startDelay)
  })

  onUnmounted(() => {
    if (typeTimeout) clearTimeout(typeTimeout)
    if (cursorTimeout) clearTimeout(cursorTimeout)
  })

  return { displayText, showCursor }
}
