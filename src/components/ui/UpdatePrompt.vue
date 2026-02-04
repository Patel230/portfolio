<template>
  <transition name="slide-up">
    <div v-if="showPrompt" class="update-prompt" role="alert" aria-live="polite">
      <div class="update-content">
        <span class="update-message">🚀 A new version is available!</span>
        <div class="update-actions">
          <button class="btn-update" @click="updateApp">Update Now</button>
          <button class="btn-dismiss" @click="dismissPrompt" aria-label="Dismiss update">×</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showPrompt = ref(false)
let newWorker = null

const handleUpdate = (event) => {
  newWorker = event.detail
  showPrompt.value = true
}

onMounted(() => {
  // Listen for service worker update event
  window.addEventListener('sw-update', handleUpdate)
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('sw-update', handleUpdate)
})

const updateApp = () => {
  if (newWorker) {
    // Send skip waiting message to service worker
    newWorker.postMessage({ type: 'SKIP_WAITING' })
  }
  
  // Reload the page to activate new service worker
  window.location.reload()
}

const dismissPrompt = () => {
  showPrompt.value = false
}
</script>

<style scoped>
.update-prompt {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 10000;
  max-width: 90vw;
  width: auto;
}

.update-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.update-message {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
}

.update-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-update {
  padding: 8px 16px;
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-update:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn-update:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

.btn-dismiss {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-dismiss:hover {
  background: var(--border);
  color: var(--text-primary);
}

.btn-dismiss:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 768px) {
  .update-prompt {
    bottom: 16px;
    left: 16px;
    right: 16px;
    transform: none;
    max-width: none;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(20px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: none;
  }

  .btn-update:hover {
    transform: none;
  }
}
</style>
