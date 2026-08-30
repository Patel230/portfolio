<template>
  <section
    id="portfolio-stack"
    class="section portfolio-stack"
    aria-labelledby="portfolio-stack-heading"
  >
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Built With</span>
      <h2 id="portfolio-stack-heading" class="section-title fade-in-up" data-reveal>
        <LucideLayers class="title-icon" />
        Portfolio Tech Stack
      </h2>

      <div class="stack-grid">
        <div
          v-for="(item, index) in stackItems"
          :key="item.name"
          class="stack-card fade-in-up"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          data-reveal
        >
          <div
            class="stack-icon"
            :style="{
              backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
              color: item.color
            }"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              :fill="item.fill ? 'currentColor' : 'none'"
              :stroke="item.fill ? 'none' : 'currentColor'"
              stroke-width="2"
              aria-hidden="true"
            >
              <path v-for="(path, i) in item.paths" :key="i" :d="path" />
            </svg>
          </div>
          <h3 class="stack-name">{{ item.name }}</h3>
          <p class="stack-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Layers as LucideLayers } from 'lucide-vue-next'
import { stackItems } from '@/data/portfolioStack.js'
</script>

<style scoped>
.portfolio-stack {
  background-color: var(--bg-primary);
}

.title-icon {
  color: #06b6d4;
  width: 28px;
  height: 28px;
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
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stack-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform var(--transition-base);
  transform-origin: left;
}

.stack-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
}

.stack-card:hover::after {
  transform: scaleX(1);
}

.stack-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 0 auto 16px;
  transition: transform 0.25s var(--ease-spring);
}

.stack-card:hover .stack-icon {
  transform: scale(1.08) rotate(4deg);
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

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stack-card {
    padding: 20px;
  }

  .stack-icon {
    width: 48px;
    height: 48px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stack-card {
    padding: 16px;
  }

  .stack-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
  }

  .stack-name {
    font-size: 1rem;
  }

  .stack-description {
    font-size: 0.8rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .stack-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stack-card {
    padding: 12px;
    display: flex;
    align-items: center;
    text-align: left;
    gap: 12px;
  }

  .stack-icon {
    width: 36px;
    height: 36px;
    margin: 0;
    flex-shrink: 0;
  }

  .stack-name {
    font-size: 0.95rem;
    margin-bottom: 4px;
  }

  .stack-description {
    font-size: 0.75rem;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .stack-card {
    padding: 10px;
  }

  .stack-icon {
    width: 32px;
    height: 32px;
  }

  .stack-name {
    font-size: 0.85rem;
  }

  .stack-description {
    font-size: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stack-card,
  .stack-card::after {
    transition: none;
  }

  .stack-card:hover {
    transform: none;
  }

  .stack-card:hover::after {
    transform: scaleX(1);
  }

  .stack-card:hover .stack-icon {
    transform: none;
  }
}
.section-label {
  color: #06b6d4;
}
</style>
