<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-content">
        <!-- Status Pill Badge -->
        <div class="status-pill">
          <span class="status-dot"></span>
          <span>Available for Full-Stack & AI Engineering</span>
        </div>
        <div class="hero-image" :class="{ fallback: imageError }">
          <img
            v-if="!imageError"
            src="/lakshman.jpg"
            alt="Lakshman Patel - Full Stack Developer"
            loading="eager"
            width="150"
            height="150"
            decoding="async"
            @error="handleImageError"
          />
          <span v-else class="initials" aria-hidden="true">LP</span>
        </div>
        <h1 id="hero-title" class="hero-title">Lakshman Patel</h1>
        <p class="hero-subtitle">
          <!-- Animated text is hidden from AT (it would re-announce on every
               keystroke); screen readers get the full role list instead -->
          <span class="sr-only">{{ roles.join(', ') }}</span>
          <span class="typing-wrapper" aria-hidden="true">
            <span class="typing-text">{{ displayText }}</span>
            <span class="cursor" :class="{ blink: showCursor }">|</span>
          </span>
        </p>
        <p class="hero-description">
          I build production-ready full-stack applications with AI at their core — Python,
          TypeScript, Vue &amp; React, running on cloud infrastructure.
        </p>
        <!-- Hero Quick Stats Bar -->
        <div class="hero-stats">
          <div class="stat-box">
            <span class="stat-val">3+</span>
            <span class="stat-lbl">Years Exp.</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-box">
            <span class="stat-val">30+</span>
            <span class="stat-lbl">Projects</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-box">
            <span class="stat-val">13K+</span>
            <span class="stat-lbl">Contributions</span>
          </div>
        </div>
        <div class="hero-links">
          <a href="#projects" class="btn btn-primary">
            <span>View Projects</span>
            <LucideArrowDown class="btn-arrow" aria-hidden="true" />
          </a>
          <a href="#contact" class="btn btn-outline">
            <span>Contact</span>
            <LucideArrowRight class="btn-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDown as LucideArrowDown, ArrowRight as LucideArrowRight } from 'lucide-vue-next'
import { useTypingEffect } from '@/composables/useTypingEffect.js'

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const roles = ['Full Stack Developer', 'AI Engineer', 'Open Source Contributor']
const { displayText, showCursor } = useTypingEffect(roles)
</script>

<style scoped>
.hero {
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 0 40px;
  position: relative;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

/* Soft ambient glow behind the hero for depth */
.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 720px;
  height: 720px;
  max-width: 100vw;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.07) 0%,
    rgba(255, 215, 0, 0.03) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 18px;
  letter-spacing: 0.02em;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulseDot 2s infinite ease-in-out;
}

@keyframes pulseDot {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 24px auto 32px;
  padding: 16px 28px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  max-width: 520px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-val {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.1;
}

.stat-lbl {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-sep {
  width: 1px;
  height: 28px;
  background: var(--border);
}

.hero-image {
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--accent);
  box-shadow:
    0 0 0 1px rgba(255, 215, 0, 0.2),
    0 20px 50px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.35s var(--ease-spring),
    box-shadow 0.35s var(--ease-spring),
    border-color 0.35s var(--ease-spring);
  will-change: transform;
  animation: heroFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
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
  color: var(--accent);
  letter-spacing: -0.03em;
  line-height: 1.1;
  animation: heroFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--accent);
  margin-bottom: 24px;
  min-height: 1.5em;
  font-weight: 500;
  animation: heroFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
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
  animation: heroFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
}

.hero-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  animation: heroFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
}

.hero-links .btn {
  min-width: 160px;
  padding: 16px 32px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.2s var(--ease-spring);
}

.hero-links .btn-primary:hover .btn-arrow {
  transform: translateY(2px);
}

.hero-links .btn-outline:hover .btn-arrow {
  transform: translateX(3px);
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

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .hero-title,
  .hero-subtitle,
  .hero-description,
  .hero-links {
    animation: none;
    opacity: 1;
    transform: none;
  }

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
