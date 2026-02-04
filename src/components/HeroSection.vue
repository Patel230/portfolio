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
        <p class="hero-subtitle">Full Stack Developer | Building with AI</p>
        <p class="hero-description">
          Building intelligent full-stack applications using AI. 3+ years experience in Python, 
          TypeScript, cloud infrastructure, and creating production-ready systems.
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
import { ref } from 'vue'

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}
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

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding-top: 60px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-links {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image {
    transition: none;
  }

  .hero-image:hover {
    transform: none;
  }
}
</style>
