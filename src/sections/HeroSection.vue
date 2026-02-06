<template>
  <section
    class="hero"
    aria-labelledby="hero-title"
  >
    <div class="container">
      <div class="hero-content">
        <div
          class="hero-image"
          :class="{ 'fallback': imageError }"
        >
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 60px;
  position: relative;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-image {
  width: 160px;
  height: 160px;
  margin: 0 auto 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.hero-image:hover {
  transform: scale(1.05) translateY(-5px);
  border-color: var(--accent);
  box-shadow: 
    0 0 0 1px var(--accent),
    0 30px 60px rgba(0, 0, 0, 0.5);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 50%;
}

.hero-image.fallback {
  background-color: var(--accent);
}

.initials {
  font-size: 4rem;
  font-weight: 800;
  color: var(--bg-primary);
  font-family: var(--font-display);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-title .accent {
  color: var(--accent);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--accent);
  margin-bottom: 24px;
  min-height: 1.5em;
  font-weight: 500;
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
  opacity: 1;
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
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 48px;
  line-height: 1.9;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.hero-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-links .btn {
  min-width: 160px;
  padding: 16px 32px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
}

.hero-links .btn-primary {
  background: var(--accent);
  color: #000;
  border: none;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
}

.hero-links .btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.5);
}

.hero-links .btn-outline {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
}

.hero-links .btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .hero {
    min-height: auto;
    padding: 100px 0 60px;
  }
  
  .hero-image {
    width: 140px;
    height: 140px;
    margin-bottom: 32px;
  }
  
  .hero-title {
    font-size: 2.75rem;
  }
  
  .hero-subtitle {
    font-size: 1.15rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .hero {
    min-height: auto;
    padding: 80px 0 50px;
  }
  
  .hero-image {
    width: 120px;
    height: 120px;
    margin-bottom: 28px;
    border-width: 3px;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    min-height: 1.5em;
    padding: 0 10px;
  }
  
  .hero-description {
    font-size: 0.95rem;
    padding: 0 8px;
    margin-bottom: 36px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 0 20px;
  }
  
  .hero-links .btn {
    min-width: unset;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .hero {
    min-height: auto;
    padding: 70px 0 40px;
  }
  
  .hero-image {
    width: 110px;
    height: 110px;
    margin-bottom: 24px;
    border-width: 3px;
  }
  
  .initials {
    font-size: 2.75rem;
  }
  
  .hero-title {
    font-size: 1.85rem;
  }
  
  .hero-subtitle {
    font-size: 0.95rem;
    min-height: 1.5em;
    padding: 0 8px;
  }
  
  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 32px;
    padding: 0 4px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0 16px;
  }
  
  .hero-links .btn {
    padding: 14px 24px;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .hero-image {
    width: 100px;
    height: 100px;
  }
  
  .hero-title {
    font-size: 1.6rem;
  }
  
  .hero-subtitle {
    font-size: 0.85rem;
    min-height: 1.5em;
  }
  
  .hero-description {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image {
    transition: none;
  }

  .hero-image:hover {
    transform: none;
  }

  .cursor.blink {
    animation: none;
  }
  
  .hero-links .btn {
    transition: none;
  }
  
  .hero-links .btn:hover {
    transform: none;
  }
}
</style>
