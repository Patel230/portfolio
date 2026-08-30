<template>
  <div class="gallery-page">
    <section class="creations-hero">
      <div class="container">
        <router-link to="/" class="back-link"> ← Back </router-link>
        <h1 class="creations-title">Project Gallery</h1>
        <p class="creations-subtitle">Explore all 30+ projects with detailed image galleries</p>
      </div>
    </section>

    <section class="gallery-section">
      <div class="container">
        <TransitionGroup name="gallery-grid" tag="div" class="gallery-grid">
          <button
            v-for="project in galleryProjects"
            :key="project.id"
            class="gallery-item"
            :aria-label="`Open ${project.name} gallery (${project.images.length} images)`"
            @click="lightbox?.open(project, $event.currentTarget)"
          >
            <div class="image-wrapper">
              <img
                :src="thumbSrc(project.thumbnail)"
                :alt="`${project.name} project screenshot`"
                loading="lazy"
                class="gallery-image"
                @error="handleImageError"
              />
              <div class="image-count-badge">
                <LucideImages class="badge-icon" />
                {{ project.images.length }}
              </div>
              <div class="overlay">
                <div class="overlay-content">
                  <h3 class="overlay-title">
                    {{ project.name }}
                  </h3>
                  <p class="overlay-description">
                    {{ project.description }}
                  </p>
                  <div class="tech-tags">
                    <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                  <span class="view-full">View All {{ project.images.length }} Images</span>
                </div>
              </div>
            </div>
          </button>
        </TransitionGroup>
      </div>
    </section>

    <ProjectLightbox ref="lightbox" :projects="galleryProjects" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { galleryProjects } from '@/data/gallery'
import { handleImageError } from '@/composables/useLightbox.js'
import { thumbSrc } from '@/utils/galleryImages.js'
import ProjectLightbox from '@/components/gallery/ProjectLightbox.vue'
import { Images as LucideImages } from 'lucide-vue-next'

const lightbox = ref(null)
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding-top: 70px;
}

.creations-hero {
  padding: 50px 0 60px;
  background-color: var(--bg-secondary);
}

.back-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  display: inline-block;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-link:hover {
  color: var(--accent);
  transform: translateX(-4px);
}

.creations-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.creations-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0;
}

.gallery-section {
  background-color: var(--bg-primary);
  padding: 80px 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
  display: block;
  width: 100%;
  padding: 0;
  text-align: inherit;
  font: inherit;
  color: inherit;
}

.gallery-item:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.gallery-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.gallery-item:focus-visible .overlay {
  opacity: 1;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-count-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  z-index: 2;
}

.badge-icon {
  width: 1rem;
  height: 1rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(13, 13, 13, 0.95) 100%);
  display: flex;
  align-items: flex-end;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay-content {
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.gallery-item:hover .overlay-content {
  transform: translateY(0);
}

.overlay-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
}

.overlay-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.tech-tag {
  padding: 4px 12px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.view-full {
  font-size: 0.875rem;
  color: var(--accent);
  font-weight: 500;
}

.gallery-grid-move,
.gallery-grid-enter-active,
.gallery-grid-leave-active {
  transition: all 0.4s ease;
}

.gallery-grid-enter-from,
.gallery-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.gallery-grid-leave-active {
  position: absolute;
}

@media (max-width: 767px) {
  .creations-hero {
    padding: 40px 0 50px;
  }

  .creations-title {
    font-size: 1.75rem;
  }

  .gallery-section {
    padding: 50px 0;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 479px) {
  .creations-hero {
    padding: 30px 0 40px;
  }

  .creations-title {
    font-size: 1.25rem;
  }

  .creations-subtitle {
    font-size: 0.85rem;
  }

  .gallery-section {
    padding: 32px 0;
  }
}

@media (max-width: 319px) {
  .creations-title {
    font-size: 1.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-item:hover {
    transform: none;
  }

  .gallery-item:hover .gallery-image {
    transform: none;
  }
}
</style>
