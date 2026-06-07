<template>
  <section id="skills" class="section skills" aria-labelledby="skills-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Skills</span>
      <h2 id="skills-heading" class="section-title fade-in-up" data-reveal>
        <LucideCode2 class="title-icon" />
        Technologies
      </h2>
      <div
        class="skills-grid"
        role="list"
        :aria-label="`${skillCategories.length} skill categories`"
      >
        <article
          v-for="(category, index) in skillCategories"
          :key="category.name"
          class="skill-category fade-in-up"
          :class="[`category-${index}`, `stagger-${Math.min(index + 1, 6)}`]"
          role="listitem"
          data-reveal
          :style="{ '--category-color': category.color }"
        >
          <h3 class="category-title">
            <span
              class="category-icon"
              aria-hidden="true"
              :style="{ backgroundColor: `${category.color}20`, color: category.color }"
            >
              <Icon :name="category.icon" :size="18" />
            </span>
            {{ category.name }}
          </h3>
          <div class="skills-list" role="list" :aria-label="`${category.name} skills`">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="skill-tag"
              role="listitem"
              :style="{ '--tag-hover-color': category.color }"
            >
              {{ skill }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skillCategories } from '@/data/skills.js'
import { Icon } from '@/components'
import { Code2 as LucideCode2 } from 'lucide-vue-next'
</script>

<style scoped>
.skills {
  background-color: var(--bg-primary);
}

.title-icon {
  color: #22c55e;
  width: 28px;
  height: 28px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.skill-category {
  padding: 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.25s var(--ease-spring);
  position: relative;
  overflow: hidden;
}

.skill-category::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--category-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-spring);
}

.skill-category:hover {
  border-color: color-mix(in srgb, var(--category-color) 40%, transparent);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
}

.skill-category:hover::after {
  transform: scaleX(1);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  transition: transform 0.25s var(--ease-spring);
}

.skill-category:hover .category-icon {
  transform: scale(1.08) rotate(4deg);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 14px;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.skill-tag:hover {
  color: var(--tag-hover-color);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--tag-hover-color);
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .skill-category {
    padding: 20px;
  }

  .category-title {
    font-size: 0.9rem;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .skill-category {
    padding: 18px;
  }

  .skills-list {
    gap: 6px;
  }

  .skill-tag {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .skill-category {
    padding: 14px;
  }

  .category-title {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }

  .category-icon {
    width: 28px;
    height: 28px;
  }

  .skills-list {
    gap: 6px;
  }

  .skill-tag {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .skill-category {
    padding: 10px;
  }

  .skill-tag {
    font-size: 0.65rem;
    padding: 3px 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-category,
  .skill-tag,
  .category-icon {
    transition: none;
  }

  .skill-category:hover {
    transform: none;
  }

  .skill-category:hover .category-icon {
    transform: none;
  }
}
.section-label {
  color: #22c55e;
}
</style>
