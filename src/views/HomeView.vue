<template>
  <div class="home">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <OpenSourceSection />
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
  ContactSection
} from '@/sections'
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
