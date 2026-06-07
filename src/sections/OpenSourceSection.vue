<template>
  <section id="opensource" class="section opensource" aria-labelledby="opensource-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Open Source</span>
      <h2 id="opensource-heading" class="section-title fade-in-up" data-reveal>
        <LucideHeart class="title-icon" />
        Contributions
      </h2>
      <div
        class="opensource-grid"
        role="list"
        :aria-label="`${contributions.length} open source contributions`"
      >
        <article
          v-for="(item, index) in contributions"
          :key="item.title"
          class="opensource-card fade-in-up"
          :class="[`opensource-${index}`, `stagger-${Math.min(index + 1, 6)}`]"
          role="listitem"
          data-reveal
          :style="{ '--item-color': item.color }"
        >
          <div
            class="opensource-icon"
            aria-hidden="true"
            :style="{ backgroundColor: `${item.color}20`, color: item.color }"
          >
            <Icon :name="item.icon" :size="24" />
          </div>
          <div class="opensource-content">
            <h3 class="opensource-title">
              {{ item.title }}
            </h3>
            <p class="opensource-description">
              {{ item.description }}
            </p>
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
import { Heart as LucideHeart } from 'lucide-vue-next'

const contributions = [
  {
    title: 'Kilo',
    description:
      'All-in-one agentic engineering platform — VS Code extension for AI-driven development. 1M+ users, #1 on OpenRouter.',
    tech: ['TypeScript', 'Kotlin', 'CSS', 'JavaScript', 'Shell'],
    link: 'https://github.com/Patel230/kilocode',
    icon: 'kilocode',
    color: '#E5C84B'
  },
  {
    title: 'Sim Studio',
    description:
      'Build and deploy AI agent workflows visually. Self-hosted platform with vector database integration.',
    tech: ['TypeScript', 'MDX', 'Python', 'CSS', 'JavaScript', 'Shell'],
    link: 'https://github.com/Patel230/sim',
    icon: 'sim',
    color: '#6F3DFA'
  },
  {
    title: 'Herm',
    description:
      'Terminal-native AI coding agent running in containers. Secure, isolated environments for autonomous development.',
    tech: ['Go', 'Docker', 'AI'],
    link: 'https://github.com/aduermael/herm',
    icon: 'bot',
    color: '#06b6d4'
  },
  {
    title: 'LangDAG',
    description:
      'High-performance tool for managing LLM conversations and workflows as DAGs. Build complex AI pipelines with ease.',
    tech: ['Go', 'LLM', 'DAG'],
    link: 'https://github.com/aduermael/langdag',
    icon: 'network',
    color: '#8b5cf6'
  }
]
</script>

<style scoped>
.opensource {
  background-color: var(--bg-secondary);
}

.title-icon {
  color: #ef4444;
  width: 28px;
  height: 28px;
}

.opensource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .opensource-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.opensource-card {
  padding: 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.25s var(--ease-spring);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.opensource-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--item-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-spring);
}

.opensource-card:hover {
  border-color: color-mix(in srgb, var(--item-color) 40%, transparent);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
}

.opensource-card:hover::after {
  transform: scaleX(1);
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
  transition: transform 0.25s var(--ease-spring);
}

.opensource-card:hover .opensource-icon {
  transform: scale(1.08) rotate(4deg);
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
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .opensource-grid {
    grid-template-columns: 1fr;
  }

  .opensource-card {
    padding: 20px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .opensource-grid {
    grid-template-columns: 1fr;
  }

  .opensource-card {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .opensource-icon {
    width: 40px;
    height: 40px;
  }

  .opensource-title {
    font-size: 1rem;
  }

  .opensource-description {
    font-size: 0.85rem;
  }

  .opensource-link {
    width: 36px;
    height: 36px;
    align-self: flex-end;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .opensource-grid {
    grid-template-columns: 1fr;
  }

  .opensource-card {
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .opensource-icon {
    width: 36px;
    height: 36px;
  }

  .opensource-title {
    font-size: 0.95rem;
  }

  .opensource-description {
    font-size: 0.8rem;
  }

  .opensource-tags .tag {
    padding: 3px 8px;
    font-size: 0.7rem;
  }

  .opensource-link {
    width: 32px;
    height: 32px;
    align-self: flex-end;
  }
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
.section-label {
  color: #ef4444;
}
</style>
