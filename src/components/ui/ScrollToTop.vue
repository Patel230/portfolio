<template>
  <transition name="fade">
    <button
      v-show="isVisible"
      class="scroll-to-top"
      aria-label="Scroll to top"
      title="Scroll to top"
      @click="scrollToTop"
    >
      <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle
          class="progress-ring-circle"
          stroke="var(--accent)"
          stroke-width="3"
          fill="transparent"
          r="20"
          cx="24"
          cy="24"
          :style="{ strokeDashoffset: strokeDashoffset }"
        />
      </svg>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        aria-hidden="true"
        class="arrow-icon"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollProgress = ref(0)
const SCROLL_THRESHOLD = 300
const CIRCUMFERENCE = 2 * Math.PI * 20

const strokeDashoffset = computed(() => {
  return CIRCUMFERENCE - (scrollProgress.value / 100) * CIRCUMFERENCE
})

const checkScroll = () => {
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value =
    scrollTotal > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollTotal) * 100)) : 0
  isVisible.value = window.scrollY > SCROLL_THRESHOLD
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(18, 18, 24, 0.85);
  backdrop-filter: blur(12px);
  color: var(--text-primary);
  border: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s var(--ease-spring);
  z-index: 100;
}

.scroll-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
  pointer-events: none;
}

.progress-ring-circle {
  stroke-dasharray: 125.66;
  transition: stroke-dashoffset 0.1s linear;
}

.arrow-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease;
}

.scroll-to-top:hover .arrow-icon {
  transform: translateY(-2px);
}

.scroll-to-top:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 767px) {
  .scroll-to-top {
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 479px) {
  .scroll-to-top {
    bottom: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-to-top {
    transition: none;
  }

  .scroll-to-top:hover {
    transform: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
