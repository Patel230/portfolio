<template>
  <section
    v-if="testimonials.length"
    id="testimonials"
    class="section testimonials"
    aria-labelledby="testimonials-heading"
  >
    <div class="container">
      <span class="section-label fade-in-up" data-reveal
        ><span class="num">10</span> Testimonials</span
      >
      <h2 id="testimonials-heading" class="section-title fade-in-up" data-reveal>
        <LucideQuote class="title-icon" aria-hidden="true" />
        What People Say
      </h2>
      <div class="testimonials-list">
        <figure
          v-for="(t, index) in testimonials"
          :key="t.name"
          class="testimonial-card fade-in-up"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          data-reveal
        >
          <blockquote class="testimonial-quote">“{{ t.quote }}”</blockquote>
          <figcaption class="testimonial-attribution">
            <span class="testimonial-name">{{ t.name }}</span>
            <span class="testimonial-role">{{ t.role }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import { testimonials } from '@/data/testimonials.js'
import { Quote as LucideQuote } from 'lucide-vue-next'
</script>

<style scoped>
.testimonials {
  background-color: var(--bg-secondary);
}

.title-icon {
  color: var(--accent);
  width: 28px;
  height: 28px;
}

.testimonials-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.testimonial-card {
  padding: 28px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  transition: all 0.25s var(--ease-spring);
  position: relative;
}

.testimonial-card::before {
  content: '“';
  position: absolute;
  top: 6px;
  left: 18px;
  font-size: 4rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.25;
  font-family: var(--font-display);
}

.testimonial-card:hover {
  border-color: rgba(255, 215, 0, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
}

.testimonial-quote {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin: 0;
}

.testimonial-attribution {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.testimonial-name {
  font-weight: 700;
  color: var(--accent);
}

.testimonial-role {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.section-label {
  color: var(--accent);
}
</style>
