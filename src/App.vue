<template>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  <div id="app">
    <NavBar />
    <main id="main-content" tabindex="-1">
      <ErrorBoundary>
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <transition name="page" mode="out-in">
                  <component :is="Component" :key="$route.path" />
                </transition>
              </template>
              <template #fallback>
                <LoadingSpinner />
              </template>
            </Suspense>
          </template>
        </router-view>
      </ErrorBoundary>
    </main>
    <FooterSection />
    <ScrollToTop />
    <UpdatePrompt />
    <div ref="cursorGlowRef" class="cursor-glow" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NavBar } from './layout'
import { FooterSection } from './sections'
import LoadingSpinner from './components/ui/LoadingSpinner.vue'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'
import ScrollToTop from './components/ui/ScrollToTop.vue'
import UpdatePrompt from './components/ui/UpdatePrompt.vue'
import { useScrollReveal } from './composables/useScrollReveal.js'

useScrollReveal('[data-reveal]')

// Signature detail: a soft radial glow that follows the pointer. Disabled for
// touch devices and users who prefer reduced motion.
const cursorGlowRef = ref(null)
let glowFrame = null

const onPointerMove = e => {
  if (!cursorGlowRef.value) return
  if (glowFrame) cancelAnimationFrame(glowFrame)
  glowFrame = requestAnimationFrame(() => {
    const el = cursorGlowRef.value
    el.style.left = `${e.clientX}px`
    el.style.top = `${e.clientY}px`
  })
}

onMounted(() => {
  const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (fine && !reduced) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  if (glowFrame) cancelAnimationFrame(glowFrame)
})
</script>

<style scoped>
.cursor-glow {
  position: fixed;
  left: 0;
  top: 0;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 62%);
  opacity: 0.28;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
}
</style>
