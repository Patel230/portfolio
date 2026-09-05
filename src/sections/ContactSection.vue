<template>
  <section id="contact" class="section contact" aria-labelledby="contact-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Contact</span>
      <h2 id="contact-heading" class="section-title fade-in-up" data-reveal>
        <LucideMail class="title-icon" aria-hidden="true" />
        Get in Touch
      </h2>
      <div class="contact-grid" role="list" :aria-label="`${contactItems.length} contact methods`">
        <a
          v-for="(item, index) in contactItems"
          :key="item.label"
          :href="item.href"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="contact-item fade-in-scale"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          role="listitem"
          data-reveal
          :style="{ '--item-color': item.color }"
        >
          <span
            class="contact-icon"
            aria-hidden="true"
            :style="{
              backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
              color: item.color
            }"
          >
            <Icon :name="item.icon" :size="20" />
          </span>
          <span class="contact-info">
            <span class="contact-label">{{ item.label }}</span>
            <span class="contact-value">{{ item.value }}</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@/components'
import { contactItems } from '@/data/contact.js'
import { Mail as LucideMail } from 'lucide-vue-next'
</script>

<style scoped>
.contact {
  background-color: var(--bg-secondary);
}

.title-icon {
  color: #ec4899;
  width: 28px;
  height: 28px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.25s var(--ease-spring);
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.contact-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--item-color, var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-spring);
}

.contact-item:hover {
  border-color: color-mix(in srgb, var(--item-color, var(--accent)) 40%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}

.contact-item:hover::after {
  transform: scaleX(1);
}

.contact-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}

.contact-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.contact-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.contact-value {
  font-size: 0.9rem;
  color: var(--text-primary);
  word-break: break-all;
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-item {
    padding: 14px 16px;
  }
}

/* Mobile Large (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .contact-item {
    padding: 12px 14px;
  }

  .contact-icon {
    width: 36px;
    height: 36px;
  }

  .contact-value {
    font-size: 0.85rem;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .contact-item {
    padding: 10px 12px;
  }

  .contact-icon {
    width: 32px;
    height: 32px;
  }

  .contact-icon svg {
    width: 16px;
    height: 16px;
  }

  .contact-label {
    font-size: 0.65rem;
  }

  .contact-value {
    font-size: 0.8rem;
  }
}

/* Extra Small (< 320px) */
@media (max-width: 319px) {
  .contact-item {
    padding: 8px 10px;
  }

  .contact-value {
    font-size: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-item {
    transition: none;
  }

  .contact-item:hover {
    transform: none;
  }
}
.section-label {
  color: #ec4899;
}
</style>
