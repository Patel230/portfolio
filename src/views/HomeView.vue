<template>
  <div class="home">
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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()

onMounted(() => {
  // Sections may not be in DOM yet due to Suspense lazy loading.
  // Retry a few times with a small delay.
  let attempts = 0
  const tryScroll = () => {
    if (!route.hash) return
    const el = document.getElementById(route.hash.replace('#', ''))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else if (attempts < 10) {
      attempts++
      setTimeout(tryScroll, 100)
    }
  }
  tryScroll()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
}
</style>
