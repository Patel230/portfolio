<template>
  <section id="gallery" class="gallery-section" aria-labelledby="gallery-heading">
    <div class="container">
      <span class="section-label"><span class="num">01</span> Gallery</span>
      <h2 id="gallery-heading" class="section-title">
        <LucideImages class="title-icon" aria-hidden="true" />
        Project Gallery
      </h2>
      <p class="section-subtitle">Visual showcase of my work - click to explore</p>

      <TransitionGroup name="gallery-grid" tag="div" class="gallery-grid">
        <button
          v-for="project in featuredProjects"
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
              <LucideImages class="badge-icon" aria-hidden="true" />
              {{ project.images.length }}
            </div>
            <div class="overlay">
              <div class="overlay-content">
                <span class="overlay-title">
                  {{ project.name }}
                </span>
                <p class="overlay-description">
                  {{ project.description }}
                </p>
                <div class="tech-tags">
                  <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
                <span class="view-full"> View All {{ project.images.length }} Images </span>
              </div>
            </div>
          </div>
        </button>
      </TransitionGroup>

      <div class="view-all-link">
        <router-link to="/gallery" class="view-all-btn">
          <LucideGrid class="view-all-icon" aria-hidden="true" />
          View All 30+ in Gallery
        </router-link>
      </div>

      <ProjectLightbox ref="lightbox" :projects="featuredProjects" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { galleryProjects } from '@/data/gallery'
import { handleImageError } from '@/composables/useLightbox.js'
import { thumbSrc } from '@/utils/galleryImages.js'
import ProjectLightbox from '@/components/gallery/ProjectLightbox.vue'
import { Images as LucideImages, LayoutGrid as LucideGrid } from 'lucide-vue-next'

const featuredProjects = computed(() => galleryProjects.slice(0, 9))

const lightbox = ref(null)
</script>

<style scoped>
.gallery-section {
  padding: 90px 0;
  background-color: var(--bg-primary);
  position: relative;
}

.gallery-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: rgba(255, 215, 0, 0.2);
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent);
  margin-bottom: 12px;
  padding: 8px 16px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 4px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.title-icon {
  color: var(--accent);
  width: 28px;
  height: 28px;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 0 40px;
  line-height: 1.7;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  width: 100%;
  padding: 0;
  text-align: inherit;
  font: inherit;
  color: inherit;
}

.gallery-item:hover {
  border-color: rgba(255, 215, 0, 0.5);
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 215, 0, 0.1);
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
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover .gallery-image {
  transform: scale(1.08);
}

.image-count-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.badge-icon {
  width: 1rem;
  height: 1rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 13, 13, 0.9);
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
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.375rem;
}

.overlay-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.875rem;
  line-height: 1.5;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
}

.tech-tag {
  padding: 5px 12px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.view-full {
  font-size: 0.875rem;
  color: var(--accent);
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.view-all-link {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 4px;
  color: var(--accent);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.view-all-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
  color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.view-all-icon {
  width: 1.25rem;
  height: 1.25rem;
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

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .gallery-section {
    padding: 4rem 1.25rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .gallery-section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .gallery-section {
    padding: 2.5rem 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
    gap: 0.5rem;
  }

  .title-icon {
    width: 24px;
    height: 24px;
  }

  .section-label {
    font-size: 0.7rem;
    padding: 5px 12px;
  }

  .section-subtitle {
    font-size: 0.85rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .overlay {
    padding: 16px;
  }

  .overlay-title {
    font-size: 1.1rem;
  }

  .overlay-description {
    font-size: 0.8rem;
  }

  .tech-tag {
    padding: 3px 8px;
    font-size: 0.65rem;
  }

  .view-all-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
    width: 100%;
    justify-content: center;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .gallery-section {
    padding: 2rem 0.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .gallery-item:hover {
    transform: none;
  }

  .gallery-item:hover .gallery-image {
    transform: none;
  }
}
</style>
