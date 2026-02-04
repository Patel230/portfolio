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
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import OpenSourceSection from '@/components/OpenSourceSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
