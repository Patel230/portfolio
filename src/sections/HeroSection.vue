<template>
  <section
    class="hero"
    aria-labelledby="hero-title"
  >
    <!-- Animated gradient orbs -->
    <div class="hero-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div
          class="hero-image"
          :class="{ 'fallback': imageError }"
        >
          <div class="hero-image-glow"></div>
          <img 
            v-if="!imageError"
            src="/lakshman.jpg" 
            alt="Lakshman Patel - Full Stack Developer"
            loading="eager"
            width="150"
            height="150"
            decoding="async"
            @error="handleImageError"
          >
          <span
            v-else
            class="initials"
            aria-hidden="true"
          >LP</span>
        </div>
        <h1
          id="hero-title"
          class="hero-title"
        >
          Lakshman Patel
        </h1>
        <p class="hero-subtitle">
          <span class="typing-wrapper">
            <span class="typing-text">{{ displayText }}</span>
            <span
              class="cursor"
              :class="{ 'blink': showCursor }"
            >|</span>
          </span>
        </p>
        <p class="hero-description">
          Building intelligent full-stack applications using AI. 3+ years experience in Python, 
          TypeScript, Vue, React, Rust, Go, Flask, FastAPI, MySQL, AWS, Docker, Linux, Shell Script, Git/GitHub, and creating production-ready systems.
        </p>
        <div class="hero-links">
          <a
            href="#projects"
            class="btn btn-primary"
          >
            <span>View Projects</span>
          </a>
          <a
            href="#contact"
            class="btn btn-outline"
          >
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const imageError = ref(false)
const displayText = ref('')
const showCursor = ref(true)

const roles = [
  'Full Stack Developer',
  'AI Engineer',
  'Open Source Contributor'
]

let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimeout = null

const handleImageError = () => {
  imageError.value = true
}

const typeEffect = () => {
  const currentRole = roles[roleIndex]
  
  if (isDeleting) {
    displayText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000
    isDeleting = true
    showCursor.value = false
    setTimeout(() => {
      showCursor.value = true
    }, 100)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typeSpeed = 500
  }

  typeTimeout = setTimeout(typeEffect, typeSpeed)
}

onMounted(() => {
  typeTimeout = setTimeout(typeEffect, 500)
})

onUnmounted(() => {
  if (typeTimeout) {
    clearTimeout(typeTimeout)
  }
})
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

/* Animated gradient background orbs */
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
  top: -200px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
  bottom: -100px;
  left: -100px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 10px) scale(1.02);
  }
}

.hero-content {
  max-width: 650px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  padding: 3px;
}

.hero-image::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.hero-image-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
  filter: blur(20px);
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.hero-image.fallback {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
}

.initials {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--bg-primary);
  font-family: var(--font-display);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  min-height: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.typing-wrapper {
  display: inline;
  white-space: nowrap;
}

.typing-text {
  display: inline;
}

.cursor {
  color: var(--accent);
  font-weight: 300;
  display: inline;
  margin-left: 2px;
  vertical-align: baseline;
}

.cursor.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero-description {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 36px;
  line-height: 1.8;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}

.hero-links {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .hero {
    min-height: auto;
    padding: 80px 0 60px;
  }
  
  .hero-image {
    width: 130px;
    height: 130px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .orb-1 {
    width: 400px;
    height: 400px;
  }
  
  .orb-2 {
    width: 300px;
    height: 300px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .hero {
    min-height: auto;
    padding: 60px 0 40px;
  }
  
  .hero-image {
    width: 110px;
    height: 110px;
    margin-bottom: 24px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    min-height: 1.5em;
    padding: 0 10px;
  }
  
  .hero-description {
    font-size: 0.9rem;
    padding: 0 8px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .gradient-orb {
    filter: blur(60px);
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .hero {
    min-height: auto;
    padding: 50px 0 30px;
  }
  
  .hero-image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  
  .initials {
    font-size: 2.5rem;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
    min-height: 1.5em;
    padding: 0 8px;
  }
  
  .hero-description {
    font-size: 0.85rem;
    margin-bottom: 28px;
    padding: 0 4px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .gradient-orb {
    filter: blur(40px);
    opacity: 0.3;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .hero-image {
    width: 90px;
    height: 90px;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 0.8rem;
    min-height: 1.5em;
  }
  
  .hero-description {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .gradient-orb,
  .hero-image-glow {
    animation: none;
    transition: none;
  }

  .cursor.blink {
    animation: none;
  }
}
</style>
