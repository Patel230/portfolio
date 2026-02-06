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

            <button
              class="lightbox-nav lightbox-prev"
              aria-label="Previous project"
              @click="navigateProject(-1)"
            >
              <LucideChevronLeft />
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

            <button
              class="lightbox-nav lightbox-next"
              aria-label="Next project"
              @click="navigateProject(1)"
            >
              <LucideChevronRight />
            </button>

            <div class="lightbox-indicators">
              <button
                v-for="(project, index) in filteredProjects"
                :key="project.id"
                :class="['indicator', { active: currentProjectIndex === index }]"
                @click="goToProject(index)"
              >
                {{ index + 1 }}
              </button>
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

const currentProject = computed(() => filteredProjects.value[currentProjectIndex.value])

const openLightbox = project => {
  currentProjectIndex.value = filteredProjects.value.findIndex(p => p.id === project.id)
  carouselIndex.value = 0
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const navigateProject = direction => {
  currentProjectIndex.value =
    (currentProjectIndex.value + direction + filteredProjects.value.length) %
    filteredProjects.value.length
  carouselIndex.value = 0
}

const goToProject = index => {
  currentProjectIndex.value = index
  carouselIndex.value = 0
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
}



.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #a855f7;
  margin-bottom: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.title-icon {
  color: #a855f7;
  width: 28px;
  height: 28px;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
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
}

.gallery-item:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  transition: opacity 0.2s ease;
}

.view-full:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.view-all-link {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.view-all-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateX(4px);
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
  backdrop-filter: blur(8px);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
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

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
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
  font-size: 1.75rem;
  font-weight: 600;
  color: #f8fafc;
  margin: 0 0 0.5rem;
}

.lightbox-description {
  color: #94a3b8;
  margin: 0 0 1rem;
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
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
}

.carousel-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-viewport {
  flex: 1;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 0.5rem;
  background: #1e293b;
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
  border-radius: 0.375rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.thumbnail.active {
  border-color: #a855f7;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.2);
}

.indicator.active {
  background: #a855f7;
  color: #fff;
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

@media (max-width: 768px) {
  .gallery-section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-prev {
    left: 0.5rem;
  }

  .lightbox-next {
    right: 0.5rem;
  }

  .image-carousel {
    padding: 0 0.5rem;
  }

  .thumbnail {
    width: 60px;
    height: 40px;
  }
}
</style>
