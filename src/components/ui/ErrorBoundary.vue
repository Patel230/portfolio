<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary" role="alert" aria-live="assertive">
    <div class="error-content">
      <div class="error-icon" aria-hidden="true">⚠️</div>
      <h2 class="error-title">Something went wrong</h2>
      <p class="error-message">We're sorry, but something unexpected happened.</p>
      <div v-if="isDevelopment && error" class="error-details">
        <details>
          <summary>Error details</summary>
          <pre>{{ error.message }}</pre>
          <pre>{{ error.stack }}</pre>
        </details>
      </div>
      <div class="error-actions">
        <button class="btn btn-primary" @click="resetError">Try Again</button>
        <router-link to="/" class="btn btn-outline" @click="clearError"> Go Home </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const hasError = ref(false)
const error = ref(null)
const isDevelopment = import.meta.env.DEV

onErrorCaptured((err, instance, info) => {
  hasError.value = true
  error.value = err

  // Log error to console
  console.error('Error captured by boundary:', err)
  console.error('Component:', instance)
  console.error('Info:', info)

  // In production, you could send to error tracking service
  if (!isDevelopment && window.gtag) {
    window.gtag('event', 'exception', {
      description: err.message,
      fatal: true
    })
  }

  // Prevent error from propagating
  return false
})

const clearError = () => {
  hasError.value = false
  error.value = null
}

const resetError = () => {
  clearError()
  window.location.reload()
}
</script>

<style scoped>
.error-boundary {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.error-message {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.error-details {
  margin-bottom: 24px;
  text-align: left;
}

.error-details details {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 8px;
}

.error-details pre {
  font-size: 0.75rem;
  color: var(--text-secondary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .error-actions {
    flex-direction: column;
  }

  .error-actions .btn {
    width: 100%;
  }
}
</style>
