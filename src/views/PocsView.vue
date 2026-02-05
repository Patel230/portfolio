<template>
  <div class="pocs">
    <section class="pocs-hero">
      <div class="container">
        <router-link
          to="/"
          class="back-link"
        >
          ← Back
        </router-link>
        <h1 class="pocs-title">
          Projects & Creations
        </h1>
        <p class="pocs-subtitle">
          Open source projects and proof-of-concept implementations.
        </p>
      </div>
    </section>
    <section class="section pocs-grid-section">
      <div class="container">
        <TransitionGroup 
          name="list" 
          tag="div"
          class="pocs-grid" 
          role="list"
          :aria-label="`${pocs.length} projects`"
        >
          <article 
            v-for="poc in pocs" 
            :key="poc.name" 
            class="poc-card"
            role="listitem"
            :style="{ '--poc-color': poc.color }"
          >
            <div class="poc-header">
              <div
                class="poc-icon"
                aria-hidden="true"
                :style="{ backgroundColor: `${poc.color}20`, color: poc.color }"
              >
                <Icon
                  :name="poc.icon"
                  :size="20"
                />
              </div>
            </div>
            <span 
              class="poc-status"
              :class="poc.status === 'Live' ? 'status-live' : 'status-dev'"
            >
              {{ poc.status }}
            </span>
            <h3 class="poc-name">
              {{ poc.name }}
            </h3>
            <p class="poc-description">
              {{ poc.description }}
            </p>
            <div class="poc-tags">
              <span 
                v-for="tech in poc.tech" 
                :key="tech" 
                class="tag"
                :style="{ '--tag-hover-color': poc.color }"
              >
                {{ tech }}
              </span>
            </div>
            <a 
              v-if="poc.link" 
              :href="poc.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="poc-link"
              :style="{ color: poc.color }"
            >
              View Project
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </article>
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<script setup>
import { pocs } from '@/data/pocs.js'
import Icon from '@/components/Icon.vue'
</script>

<style scoped>
.pocs {
  min-height: 100vh;
  padding-top: 70px;
}

.pocs-hero {
  padding: 50px 0 60px;
  background-color: var(--bg-secondary);
}

.back-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  display: inline-block;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: var(--accent);
  transform: translateX(-4px);
}

.pocs-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.pocs-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0;
}

.pocs-grid-section {
  background-color: var(--bg-primary);
  padding: 80px 0;
}

.pocs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.poc-card {
  padding: 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.poc-card:hover {
  border-color: var(--poc-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.poc-card:focus-within {
  border-color: var(--poc-color);
  outline: 2px solid var(--poc-color);
  outline-offset: 2px;
}

.poc-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}

.poc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.poc-card:hover .poc-icon {
  transform: scale(1.1);
}

.poc-card {
  position: relative;
}

.poc-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.poc-status {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 12px;
}

.status-live {
  background-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-dev {
  background-color: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.poc-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  flex-grow: 1;
}

.poc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.poc-tags .tag {
  padding: 4px 12px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.poc-tags .tag:hover {
  color: var(--tag-hover-color);
  border-color: var(--tag-hover-color);
  background-color: rgba(255, 255, 255, 0.05);
}

.poc-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  width: fit-content;
  transition: opacity 0.2s ease;
}

.poc-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.poc-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 4px;
}

/* TransitionGroup animations */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .pocs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .poc-card {
    padding: 20px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .pocs-hero {
    padding: 40px 0 50px;
  }
  
  .pocs-title {
    font-size: 1.5rem;
  }
  
  .pocs-subtitle {
    font-size: 0.9rem;
  }
  
  .pocs-grid {
    grid-template-columns: 1fr;
  }
  
  .poc-card {
    padding: 18px;
  }
  
  .poc-name {
    font-size: 1rem;
  }
  
  .poc-description {
    font-size: 0.8rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .pocs-hero {
    padding: 30px 0 40px;
  }
  
  .back-link {
    font-size: 0.8rem;
    margin-bottom: 16px;
  }
  
  .pocs-title {
    font-size: 1.25rem;
  }
  
  .pocs-subtitle {
    font-size: 0.85rem;
  }
  
  .pocs-grid-section {
    padding: 50px 0;
  }
  
  .pocs-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .poc-card {
    padding: 14px;
  }
  
  .poc-icon {
    width: 32px;
    height: 32px;
  }
  
  .poc-name {
    font-size: 0.95rem;
  }
  
  .poc-description {
    font-size: 0.75rem;
  }
  
  .poc-tags .tag {
    padding: 3px 10px;
    font-size: 0.7rem;
  }
  
  .poc-status {
    font-size: 0.6rem;
    padding: 3px 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .poc-card,
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: none;
  }

  .poc-card:hover {
    transform: none;
  }

  .poc-card:hover .poc-icon {
    transform: none;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
