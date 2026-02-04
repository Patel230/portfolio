<template>
  <section id="opensource" class="section opensource" aria-labelledby="opensource-heading">
    <div class="container">
      <span class="section-label">Open Source</span>
      <h2 id="opensource-heading" class="section-title">Contributions</h2>
      <div 
        class="opensource-grid" 
        role="list"
        :aria-label="`${contributions.length} open source contributions`"
      >
        <article 
          v-for="(item, index) in contributions" 
          :key="item.title" 
          class="opensource-card"
          :class="`opensource-${index}`"
          role="listitem"
          :style="{ '--item-color': item.color }"
        >
          <div class="opensource-icon" aria-hidden="true" :style="{ backgroundColor: `${item.color}20`, color: item.color }">
            <Icon :name="item.icon" :size="24" />
          </div>
          <div class="opensource-content">
            <h3 class="opensource-title">{{ item.title }}</h3>
            <p class="opensource-description">{{ item.description }}</p>
            <div class="opensource-tags">
              <span 
                v-for="tech in item.tech" 
                :key="tech" 
                class="tag"
                :style="{ '--tag-hover-color': item.color }"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <a 
            :href="item.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="opensource-link"
            :style="{ color: item.color }"
            aria-label="View on GitHub"
          >
            <Icon name="github" :size="20" />
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@/components'

const contributions = [
  {
    title: 'Kilo CLI',
    description: 'AI-powered code editor with intelligent assistance. Contributing to core features and AI integrations.',
    tech: ['TypeScript', 'Kotlin', 'CSS', 'JavaScript', 'Shell'],
    link: 'https://github.com/Patel230/kilocode',
    icon: 'kilocode',
    color: '#E5C84B'
  },
  {
    title: 'SIM',
    description: 'Systems Intelligence Management platform. Building modules for system monitoring and intelligence.',
    tech: ['TypeScript', 'MDX', 'Python', 'CSS', 'JavaScript'],
    link: 'https://github.com/Patel230/sim',
    icon: 'sim',
    color: '#6F3DFA'
  }
]
</script>

<style scoped>
.opensource {
  background-color: var(--bg-secondary);
}

.opensource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .opensource-grid {
    grid-template-columns: 1fr;
  }
}

.opensource-card {
  padding: 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.opensource-card:hover {
  border-color: var(--item-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.opensource-card:focus-within {
  border-color: var(--item-color);
  outline: 2px solid var(--item-color);
  outline-offset: 2px;
}

.opensource-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.opensource-card:hover .opensource-icon {
  transform: scale(1.1);
}

.opensource-content {
  flex: 1;
  min-width: 0;
}

.opensource-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.opensource-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.opensource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.tag:hover {
  color: var(--tag-hover-color);
  background-color: rgba(255, 255, 255, 0.05);
  border-color: var(--tag-hover-color);
}

.opensource-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.opensource-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.opensource-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .opensource-card,
  .opensource-icon,
  .tag {
    transition: none;
  }

  .opensource-card:hover {
    transform: none;
  }

  .opensource-card:hover .opensource-icon {
    transform: none;
  }
}
</style>
