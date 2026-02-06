<template>
  <section id="gallery" class="gallery-section" aria-labelledby="gallery-heading">
    <div class="container">
      <span class="section-label">Gallery</span>
      <h2 id="gallery-heading" class="section-title">
        <LucideImages class="title-icon" />
        Project Gallery
      </h2>
      <p class="section-subtitle">Visual showcase of my work - click to explore</p>

      <TransitionGroup name="gallery-grid" tag="div" class="gallery-grid">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="gallery-item"
          @click="openLightbox(project)"
        >
          <div class="image-wrapper">
            <img
              :src="project.thumbnail"
              :alt="project.name"
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
                <span class="view-full"> View All {{ project.images.length }} Images </span>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div class="view-all-link">
        <router-link to="/gallery" class="view-all-btn">
          <LucideGrid class="view-all-icon" />
          View All 30+ in Gallery
        </router-link>
      </div>

      <Teleport to="body">
        <Transition name="lightbox">
          <div
            v-if="lightboxOpen"
            class="lightbox"
            tabindex="0"
            @click.self="closeLightbox"
            @keydown.escape="closeLightbox"
          >
            <button class="lightbox-close" aria-label="Close" @click="closeLightbox">
              <LucideX />
            </button>

            <div v-if="currentProject" class="lightbox-content">
              <div class="lightbox-header">
                <h3 class="lightbox-title">
                  {{ currentProject.name }}
                </h3>
                <p class="lightbox-description">
                  {{ currentProject.description }}
                </p>
                <div class="lightbox-tech">
                  <span v-for="tech in currentProject.tech" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="image-carousel">
                <button
                  class="carousel-nav carousel-prev"
                  :disabled="carouselIndex === 0"
                  @click="navigateCarousel(-1)"
                >
                  <LucideChevronLeft />
                </button>

                <div class="carousel-viewport">
                  <Transition name="carousel" mode="out-in">
                    <img
                      :key="carouselIndex"
                      :src="currentProject.images[carouselIndex].src"
                      :alt="currentProject.images[carouselIndex].caption"
                      class="carousel-image"
                      @error="handleImageError"
                    />
                  </Transition>
                </div>

                <button
                  class="carousel-nav carousel-next"
                  :disabled="carouselIndex === currentProject.images.length - 1"
                  @click="navigateCarousel(1)"
                >
                  <LucideChevronRight />
                </button>
              </div>

              <div class="carousel-footer">
                <span class="image-counter">
                  {{ carouselIndex + 1 }} / {{ currentProject.images.length }}
                </span>
                <p class="image-caption">
                  {{ currentProject.images[carouselIndex].caption }}
                </p>
              </div>

              <div class="thumbnail-strip">
                <button
                  v-for="(img, index) in currentProject.images"
                  :key="index"
                  :class="['thumbnail', { active: carouselIndex === index }]"
                  @click="carouselIndex = index"
                >
                  <img :src="img.src" :alt="img.caption" @error="handleImageError" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { galleryProjects } from '@/data/gallery'
import {
  Images as LucideImages,
  X as LucideX,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight,
  LayoutGrid as LucideGrid
} from 'lucide-vue-next'

const lightboxOpen = ref(false)
const currentProjectIndex = ref(0)
const carouselIndex = ref(0)

const featuredProjects = computed(() => galleryProjects.slice(0, 9))

const currentProject = computed(() => featuredProjects.value[currentProjectIndex.value])

const openLightbox = project => {
  currentProjectIndex.value = featuredProjects.value.findIndex(p => p.id === project.id)
  carouselIndex.value = 0
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const navigateCarousel = direction => {
  if (!currentProject.value) return
  const newIndex = carouselIndex.value + direction
  if (newIndex >= 0 && newIndex < currentProject.value.images.length) {
    carouselIndex.value = newIndex
  }
}

const handleImageError = e => {
  e.target.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%231e293b" width="800" height="500"/%3E%3Ctext fill="%2364748b" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage Coming Soon%3C/text%3E%3C/svg%3E'
}

const handleKeydown = e => {
  if (!lightboxOpen.value) return
  if (e.key === 'ArrowLeft') navigateCarousel(-1)
  if (e.key === 'ArrowRight') navigateCarousel(1)
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.gallery-section {
  padding: 80px 1.5rem;
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
}

.gallery-item:hover {
  border-color: rgba(255, 215, 0, 0.5);
  transform: translateY(-4px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 215, 0, 0.1);
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

.view-full:hover {
  color: var(--accent-hover);
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

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(20px);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.lightbox-content {
  width: 100%;
  max-width: 900px;
  padding: 0 1rem;
}

.lightbox-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.lightbox-title {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.5rem;
}

.lightbox-description {
  color: #94a3b8;
  margin: 0 0 1rem;
  line-height: 1.6;
}

.lightbox-tech {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.image-carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-nav {
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
}

.carousel-nav:hover:not(:disabled) {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.4);
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-viewport {
  flex: 1;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.2s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

.carousel-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.image-counter {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.image-caption {
  font-size: 1rem;
  color: #f8fafc;
  margin: 0;
}

.thumbnail-strip {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 50px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.thumbnail.active {
  border-color: var(--accent);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
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

  .lightbox-content {
    max-width: 95%;
  }

  .thumbnail {
    width: 70px;
    height: 45px;
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

  .lightbox-content {
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .lightbox-title {
    font-size: 1.5rem;
  }

  .image-carousel {
    padding: 0 0.5rem;
  }

  .thumbnail {
    width: 60px;
    height: 40px;
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

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem;
  }

  .lightbox-content {
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .lightbox-title {
    font-size: 1.25rem;
  }

  .lightbox-description {
    font-size: 0.875rem;
  }

  .carousel-nav {
    padding: 0.5rem;
  }

  .thumbnail {
    width: 50px;
    height: 32px;
  }

  .thumbnail-strip {
    gap: 0.375rem;
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

  .thumbnail {
    width: 40px;
    height: 26px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .gallery-item,
  .gallery-image,
  .overlay,
  .overlay-content,
  .lightbox,
  .carousel-nav,
  .thumbnail {
    transition: none;
  }

  .gallery-item:hover {
    transform: none;
  }

  .gallery-item:hover .gallery-image {
    transform: none;
  }

  .lightbox-close:hover {
    transform: none;
  }
}
</style>
