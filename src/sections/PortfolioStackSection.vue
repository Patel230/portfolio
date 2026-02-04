<template>
  <section id="portfolio-stack" class="section portfolio-stack" aria-labelledby="portfolio-stack-heading">
    <div class="container">
      <span class="section-label">Built With</span>
      <h2 id="portfolio-stack-heading" class="section-title">Portfolio Tech Stack</h2>
      
      <div class="stack-grid">
        <!-- Core Framework -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(65, 184, 131, 0.15); color: #41b883;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 3h3.5L12 19.5 18.5 3H22L14 21h-4L2 3z"/>
            </svg>
          </div>
          <h3 class="stack-name">Vue 3</h3>
          <p class="stack-description">Progressive JavaScript framework with Composition API</p>
        </div>

        <!-- Build Tool -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(100, 108, 255, 0.15); color: #646cff;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3 class="stack-name">Vite</h3>
          <p class="stack-description">Next generation frontend tooling with fast HMR</p>
        </div>

        <!-- Language -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(49, 120, 198, 0.15); color: #3178c6;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm10.5 13.5v-1.8l-3.6 1.8v-1.8l3.6-1.8V9.9l-5.4 2.7v1.8l1.8-.9v3.6l3.6-1.8zm4.5-.9v-3.6h-1.8v3.6c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-3.6h-1.8v3.6c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7z"/>
            </svg>
          </div>
          <h3 class="stack-name">TypeScript</h3>
          <p class="stack-description">Type-safe JavaScript with enhanced developer experience</p>
        </div>

        <!-- Routing -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(251, 191, 36, 0.15); color: #fbbf24;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
            </svg>
          </div>
          <h3 class="stack-name">Vue Router</h3>
          <p class="stack-description">Official routing solution for Vue.js applications</p>
        </div>

        <!-- Testing -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(252, 186, 3, 0.15); color: #fcba03;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
            </svg>
          </div>
          <h3 class="stack-name">Vitest</h3>
          <p class="stack-description">Blazing fast unit testing powered by Vite</p>
        </div>

        <!-- Linting -->
        <div class="stack-card">
          <div class="stack-icon" style="background-color: rgba(75, 85, 99, 0.15); color: #9ca3af;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <h3 class="stack-name">ESLint + Prettier</h3>
          <p class="stack-description">Code linting and formatting for consistent style</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.portfolio-stack {
  background-color: var(--bg-primary);
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stack-card {
  padding: 28px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  text-align: center;
}

.stack-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.stack-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 0 auto 16px;
  transition: transform 0.2s ease;
}

.stack-card:hover .stack-icon {
  transform: scale(1.1);
}

.stack-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.stack-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stack-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stack-card {
    transition: none;
  }

  .stack-card:hover {
    transform: none;
  }

  .stack-card:hover .stack-icon {
    transform: none;
  }
}
</style>
