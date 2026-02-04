<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1 class="not-found-code">404</h1>
        <p class="not-found-title">Page Not Found</p>
        <p class="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link to="/" class="btn btn-primary">
          ← Go Back Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - 70px);
  padding-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  padding: 40px 20px;
}

.not-found-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 16px;
  line-height: 1;
}

.not-found-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.not-found-description {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .not-found-code {
    font-size: 5rem;
  }

  .not-found-title {
    font-size: 1.25rem;
  }
}
</style>
