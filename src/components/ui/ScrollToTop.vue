<template>
  <transition name="fade">
    <button
      v-show="isVisible"
      class="scroll-to-top"
      aria-label="Scroll to top"
      title="Scroll to top"
      @click="scrollToTop"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const SCROLL_THRESHOLD = 300

const checkScroll = () => {
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
  background-color: var(--accent);
  color: var(--bg-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  transition: all 0.2s ease;
  z-index: 100;
}

.scroll-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
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

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
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
