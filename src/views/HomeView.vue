<template>
  <div class="home">
    <HeroSection />
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
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  OpenSourceSection,
  GitHubSection,
  PortfolioStackSection,
  ContactSection
} from '@/sections'
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
