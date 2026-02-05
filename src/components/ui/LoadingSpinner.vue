<template>
  <div
    class="loading-container"
    role="status"
    aria-live="polite"
  >
    <div
      class="spinner"
      aria-hidden="true"
    />
    <p class="loading-text">
      Loading...
    </p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-container {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: var(--border);
    border-style: dashed;
  }
}
</style>
