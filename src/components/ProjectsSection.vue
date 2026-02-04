<template>
  <section id="projects" class="section projects" aria-labelledby="projects-heading">
    <div class="container">
      <span class="section-label">Projects</span>
      <h2 id="projects-heading" class="section-title">Featured Work</h2>
      <div 
        class="projects-grid" 
        role="list"
        :aria-label="`${projects.length} featured projects`"
      >
        <article 
          v-for="(project, index) in projects" 
          :key="project.title" 
          class="project-card"
          :class="`project-${index}`"
          role="listitem"
          :style="{ '--project-color': project.color }"
        >
          <div class="project-icon" aria-hidden="true" :style="{ backgroundColor: `${project.color}20`, color: project.color }">
            <Icon :name="project.icon" :size="24" />
          </div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span 
              v-for="tech in project.tech" 
              :key="tech" 
              class="tag"
              :style="{ '--tag-hover-color': project.color }"
            >
              {{ tech }}
            </span>
          </div>
          <a 
            v-if="project.link" 
            :href="project.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="project-link"
            :style="{ color: project.color }"
          >
            View
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </article>
      </div>
      <div class="pocs-link">
        <router-link to="/creations">View all 30+ Creations →</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { projects } from '@/data/projects.js'
import Icon from './Icon.vue'
</script>

<style scoped>
.projects {
  background-color: var(--bg-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.project-card {
  padding: 28px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: var(--project-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.project-card:focus-within {
  border-color: var(--project-color);
  outline: 2px solid var(--project-color);
  outline-offset: 2px;
}

.project-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 16px;
  transition: transform 0.2s ease;
}

.project-card:hover .project-icon {
  transform: scale(1.1);
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.project-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  padding: 5px 12px;
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

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  width: fit-content;
  transition: opacity 0.2s ease;
}

.project-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.project-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 4px;
}

.pocs-link {
  margin-top: 40px;
  text-align: center;
}

.pocs-link a {
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.pocs-link a:hover {
  color: var(--accent);
}

.pocs-link a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-icon,
  .tag {
    transition: none;
  }

  .project-card:hover {
    transform: none;
  }

  .project-card:hover .project-icon {
    transform: none;
  }
}
</style>
