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
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import OpenSourceSection from '@/sections/OpenSourceSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
