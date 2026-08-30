<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        ref="lightboxRef"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="currentProject ? `${currentProject.name} gallery` : 'Project gallery'"
        tabindex="-1"
        @click.self="closeLightbox"
      >
        <button class="lightbox-close" aria-label="Close gallery" @click="closeLightbox">
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
              aria-label="Previous image"
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
              aria-label="Next image"
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

          <div ref="thumbnailStripRef" class="thumbnail-strip">
            <button
              v-for="(img, index) in currentProject.images"
              :key="index"
              :ref="el => setThumbnailRef(el, index)"
              :class="['thumbnail', { active: carouselIndex === index }]"
              :aria-label="`View image ${index + 1}: ${img.caption}`"
              @click="selectThumbnail(index)"
            >
              <img
                :src="thumbSrc(img.src)"
                :alt="`${currentProject.name} — screenshot ${index + 1}`"
                loading="lazy"
                @error="handleImageError"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useLightbox } from '@/composables/useLightbox.js'
import { thumbSrc } from '@/utils/galleryImages.js'
import {
  X as LucideX,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight
} from 'lucide-vue-next'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const {
  lightboxOpen,
  lightboxRef,
  currentProject,
  carouselIndex,
  thumbnailStripRef,
  setThumbnailRef,
  selectThumbnail,
  openLightbox,
  closeLightbox,
  navigateCarousel,
  handleImageError
} = useLightbox(() => props.projects)

defineExpose({ open: openLightbox })
</script>

<style scoped>
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
  color: var(--text-primary);
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
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.lightbox-description {
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.6;
}

.lightbox-tech {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
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
  color: var(--text-primary);
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
  background: var(--bg-card);
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
  color: var(--text-muted);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.image-caption {
  font-size: 1rem;
  color: var(--text-primary);
  margin: 0;
}

.thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-padding: 0 1rem;
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
  scroll-snap-align: center;
  flex-shrink: 0;
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.thumbnail.active {
  border-color: var(--accent);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

.thumbnail:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    height: 44px;
  }

  .thumbnail-strip {
    gap: 0.4rem;
    padding: 0 0.75rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
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
    height: 44px;
  }

  .thumbnail-strip {
    gap: 0.35rem;
    padding: 0 0.5rem;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .thumbnail {
    width: 44px;
    height: 44px;
  }

  .thumbnail-strip {
    gap: 0.25rem;
    padding: 0 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox,
  .carousel-nav,
  .thumbnail {
    transition: none;
  }

  .lightbox-close:hover {
    transform: none;
  }
}
</style>
