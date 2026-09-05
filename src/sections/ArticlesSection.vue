<template>
  <section
    v-if="articles.length"
    id="writing"
    class="section writing"
    aria-labelledby="writing-heading"
  >
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>Writing</span>
      <h2 id="writing-heading" class="section-title fade-in-up" data-reveal>
        <LucidePenLine class="title-icon" aria-hidden="true" />
        Articles &amp; Writing
      </h2>
      <div class="article-list" role="list">
        <a
          v-for="(article, index) in articles"
          :key="article.url"
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="article-item fade-in-up"
          :class="`stagger-${Math.min(index + 1, 6)}`"
          role="listitem"
          data-reveal
        >
          <div class="article-top">
            <span class="article-tag">{{ article.tag }}</span>
            <span class="article-date">{{ article.date }}</span>
          </div>
          <h3 class="article-title">
            {{ article.title }}
            <LucideArrowUpRight class="article-arrow" aria-hidden="true" />
          </h3>
          <p v-if="article.description" class="article-desc">{{ article.description }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { articles } from '@/data/articles.js'
import { PenLine as LucidePenLine, ArrowUpRight as LucideArrowUpRight } from 'lucide-vue-next'
</script>

<style scoped>
.writing {
  background-color: var(--bg-primary);
}

.title-icon {
  color: #ec4899;
  width: 28px;
  height: 28px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-item {
  display: block;
  padding: 20px 22px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.25s var(--ease-spring);
}

.article-item:hover {
  border-color: rgba(236, 72, 153, 0.4);
  transform: translateX(6px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
}

.article-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.article-tag {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ec4899;
}

.article-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.article-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.article-arrow {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  transition:
    transform 0.2s var(--ease-spring),
    color 0.2s ease;
}

.article-item:hover .article-arrow {
  color: #ec4899;
  transform: translate(2px, -2px);
}

.article-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.section-label {
  color: #ec4899;
}
</style>
