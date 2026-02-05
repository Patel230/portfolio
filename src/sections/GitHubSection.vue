<template>
  <section
    id="github"
    class="section github"
    aria-labelledby="github-heading"
  >
    <div class="container">
      <span class="section-label">GitHub</span>
      <h2
        id="github-heading"
        class="section-title"
      >
        <LucideGithub class="title-icon" />
        Stats & Activity
      </h2>
      
      <div class="github-content">
        <!-- Stats Image -->
        <div class="github-stats-card">
          <a 
            href="https://github.com/Patel230" 
            target="_blank" 
            rel="noopener noreferrer"
            class="stats-link"
          >
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api?username=Patel230&show_icons=true&theme=dark&hide_border=true&bg_color=0d0d0d&title_color=fbbf24&text_color=ffffff&icon_color=fbbf24"
              alt="GitHub Stats"
              class="stats-image"
              loading="lazy"
            >
          </a>
        </div>

        <!-- Quick Links -->
        <div class="github-links">
          <a 
            v-for="link in githubLinks" 
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link-item"
          >
            <span
              class="link-icon"
              aria-hidden="true"
            >
              <Icon
                :name="link.icon"
                :size="20"
              />
            </span>
            <span class="link-text">{{ link.label }}</span>
            <Icon
              name="external"
              :size="16"
              class="link-arrow"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@/components'
import { Github as LucideGithub } from 'lucide-vue-next'

const githubLinks = [
  {
    label: 'View Profile',
    href: 'https://github.com/Patel230',
    icon: 'github'
  },
  {
    label: 'Repositories',
    href: 'https://github.com/Patel230?tab=repositories',
    icon: 'folder'
  },
  {
    label: 'Contributions',
    href: 'https://github.com/Patel230?tab=overview',
    icon: 'activity'
  }
]
</script>

<style scoped>
.github {
  background-color: var(--bg-primary);
}

.title-icon {
  color: #9ca3af;
  width: 28px;
  height: 28px;
}

.github-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

.github-stats-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.2s ease;
}

.github-stats-card:hover {
  border-color: var(--accent);
}

.stats-link {
  display: block;
}

.stats-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.github-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.github-link-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.github-link-item:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.github-link-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.link-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(251, 191, 36, 0.15);
  color: var(--accent);
  border-radius: 10px;
  flex-shrink: 0;
}

.link-text {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.link-arrow {
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.github-link-item:hover .link-arrow {
  color: var(--accent);
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .github-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .github-links {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .github-link-item {
    flex: 1;
    min-width: 200px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .github-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .github-stats-card {
    padding: 16px;
  }
  
  .github-links {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .github-link-item {
    flex: 1;
    min-width: 140px;
    padding: 12px 14px;
  }
  
  .link-icon {
    width: 32px;
    height: 32px;
  }
  
  .link-text {
    font-size: 0.85rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .github-content {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .github-stats-card {
    padding: 12px;
  }
  
  .github-links {
    flex-direction: column;
    gap: 8px;
  }
  
  .github-link-item {
    padding: 10px 12px;
    min-width: auto;
  }
  
  .link-icon {
    width: 28px;
    height: 28px;
  }
  
  .link-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .link-text {
    font-size: 0.8rem;
  }
  
  .link-arrow {
    width: 14px;
    height: 14px;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .github-stats-card {
    padding: 8px;
  }
  
  .github-link-item {
    padding: 8px 10px;
  }
  
  .link-text {
    font-size: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .github-stats-card,
  .github-link-item {
    transition: none;
  }

  .github-link-item:hover {
    transform: none;
  }
}
</style>
