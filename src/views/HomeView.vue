<template>
  <div class="home">
    <!-- Version Update Badge -->
    <div class="version-update">
      <Icon name="calendar" size="14" />
      <span>Updated: v1.0.1 (February 6, 2026)</span>
    </div>
    <HeroSection />
    <GallerySection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <OpenSourceSection />
    <GitHubSection />
    <PortfolioStackSection />
    <ContactSection />
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  GallerySection,
  OpenSourceSection,
  GitHubSection,
  PortfolioStackSection,
  ContactSection
} from '@/sections'
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
}

/* Version Update Badge - Top Right Corner */
.version-update {
  position: fixed;
  top: 75px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  background-color: var(--bg-card);
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  z-index: 9999;
  transition: border-color 0.2s ease;
  font-weight: 500;
}

.version-update:hover {
  border-color: var(--accent);
}

.version-update :deep(svg) {
  color: var(--accent);
  flex-shrink: 0;
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .version-update {
    position: relative;
    top: auto;
    right: auto;
    margin: 10px auto 0;
    width: fit-content;
    font-size: 0.75rem;
    padding: 8px 12px;
  }
}

@media (max-width: 479px) {
  .version-update {
    font-size: 0.7rem;
    padding: 6px 10px;
    gap: 4px;
    border-radius: 8px;
  }
  
  .version-update :deep(svg) {
    width: 12px;
    height: 12px;
  }
}
</style>
