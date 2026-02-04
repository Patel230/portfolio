<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-content">
        <div class="hero-image" :class="{ 'fallback': imageError }">
          <img 
            v-if="!imageError"
            src="/lakshman.jpg" 
            alt="Lakshman Patel - Full Stack Developer"
            loading="eager"
            width="140"
            height="140"
            decoding="async"
            @error="handleImageError"
          />
          <span v-else class="initials" aria-hidden="true">LP</span>
        </div>
        <h1 id="hero-title" class="hero-title">Lakshman Patel</h1>
        <p class="hero-subtitle">
          <span class="typing-wrapper">
            <span class="typing-text">{{ displayText }}</span>
            <span class="cursor" :class="{ 'blink': showCursor }">|</span>
          </span>
        </p>
        <p class="hero-description">
          Building intelligent full-stack applications using AI. 3+ years experience in Python, 
          TypeScript, Vue, React, Rust, Go, Flask, FastAPI, MySQL, AWS, Docker, Linux, Shell Script, Git/GitHub, and creating production-ready systems.
        </p>
        <div class="hero-links">
          <a href="#projects" class="btn btn-primary">
            <span>View Projects</span>
          </a>
          <a href="#contact" class="btn btn-outline">
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
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.hero-image {
  width: 140px;
  height: 140px;
  margin: 0 auto 28px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent);
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 30px rgba(251, 191, 36, 0.3);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.hero-image.fallback {
  background-color: var(--accent);
}

.initials {
  font-size: 3rem;
  font-weight: 700;
  color: var(--bg-primary);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--accent);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
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
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.8;
}

.hero-links {
  display: flex;
  gap: 12px;
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
    width: 120px;
    height: 120px;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .hero {
    min-height: auto;
    padding: 60px 0 40px;
  }
  
  .hero-image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
    min-height: 1.5em;
    padding: 0 10px;
  }
  
  .hero-description {
    font-size: 0.85rem;
    padding: 0 8px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .hero {
    min-height: auto;
    padding: 50px 0 30px;
  }
  
  .hero-image {
    width: 90px;
    height: 90px;
    margin-bottom: 16px;
    border-width: 2px;
  }
  
  .initials {
    font-size: 2rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 0.8rem;
    min-height: 1.5em;
    padding: 0 8px;
  }
  
  .hero-description {
    font-size: 0.8rem;
    margin-bottom: 20px;
    padding: 0 4px;
  }
  
  .hero-links {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .btn {
    padding: 10px 16px;
    font-size: 0.85rem;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .hero-image {
    width: 80px;
    height: 80px;
  }
  
  .hero-title {
    font-size: 1.25rem;
  }
  
  .hero-subtitle {
    font-size: 0.75rem;
    min-height: 1.5em;
  }
  
  .hero-description {
    font-size: 0.75rem;
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
}
</style>
