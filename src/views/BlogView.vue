<template>
  <div class="blog">
    <section class="blog-hero">
      <div class="container">
        <router-link to="/" class="back-link"> ← Back </router-link>
        <h1 class="blog-title">Journey</h1>
        <p class="blog-subtitle">
          A poor boy from a farming village. A folk singing dream. And a very long road to
          Bengaluru.
        </p>
      </div>
    </section>

    <section class="blog-content section">
      <div class="container">
        <div class="posts-list">
          <article v-for="post in [...posts].reverse()" :key="post.id" class="post-card">
            <div class="post-meta">
              <span class="post-tag" :style="{ '--tag-color': post.color }">{{ post.tag }}</span>
              <time :datetime="post.dateISO" class="post-date">{{ post.date }}</time>
            </div>
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-body" v-html="post.safeBody" />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import DOMPurify from 'dompurify'
import { posts as rawPosts } from '@/data/posts.js'

const posts = rawPosts.map(post => ({
  ...post,
  safeBody: DOMPurify.sanitize(post.body, { USE_PROFILES: { html: true } })
}))
</script>

<style scoped>
.blog {
  min-height: 100vh;
  padding-top: 70px;
}

.blog-hero {
  padding: 50px 0 60px;
  background-color: var(--bg-secondary);
}

.back-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  display: inline-block;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-link:hover {
  color: var(--accent);
  transform: translateX(-4px);
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.blog-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.blog-content {
  background-color: var(--bg-primary);
  padding: 80px 0;
}

.posts-list {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.post-card {
  border-left: 3px solid var(--border);
  padding-left: 28px;
  position: relative;
}

.post-card::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--tag-color) 15%, transparent);
  color: var(--tag-color);
  border: 1px solid color-mix(in srgb, var(--tag-color) 40%, transparent);
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.post-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.3;
}

.post-body :deep(p) {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 16px;
}

.post-body :deep(p:last-child) {
  margin-bottom: 0;
}

.post-body :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.post-body :deep(em) {
  color: var(--accent);
  font-style: italic;
}

.post-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity var(--transition-fast);
}

.post-body :deep(a:hover) {
  opacity: 0.8;
}

/* Stagger entrance animation for timeline posts */
.post {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.post:nth-child(1) { animation-delay: 0.04s; }
.post:nth-child(2) { animation-delay: 0.08s; }
.post:nth-child(3) { animation-delay: 0.12s; }
.post:nth-child(4) { animation-delay: 0.16s; }
.post:nth-child(5) { animation-delay: 0.20s; }
.post:nth-child(6) { animation-delay: 0.24s; }
.post:nth-child(7) { animation-delay: 0.28s; }
.post:nth-child(8) { animation-delay: 0.32s; }
.post:nth-child(9) { animation-delay: 0.36s; }
.post:nth-child(10) { animation-delay: 0.40s; }
.post:nth-child(11) { animation-delay: 0.44s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile */
@media (max-width: 767px) {
  .blog-hero {
    padding: 40px 0 50px;
  }

  .blog-title {
    font-size: 1.5rem;
  }

  .blog-content {
    padding: 50px 0;
  }

  .posts-list {
    gap: 40px;
  }

  .post-card {
    padding-left: 20px;
  }

  .post-title {
    font-size: 1.15rem;
  }

  .post-body :deep(p) {
    font-size: 0.9rem;
  }
}

@media (max-width: 479px) {
  .blog-title {
    font-size: 1.25rem;
  }

  .blog-content {
    padding: 40px 0;
  }

  .posts-list {
    gap: 32px;
  }

  .post-title {
    font-size: 1.05rem;
  }

  .post-body :deep(p) {
    font-size: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-link {
    transition: none;
  }

  .back-link:hover {
    transform: none;
  }

  .post {
    animation: none;
    opacity: 1;
  }
}
</style>
