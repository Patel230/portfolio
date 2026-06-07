<template>
  <section id="github" class="section github" aria-labelledby="github-heading">
    <div class="container">
      <span class="section-label fade-in-up" data-reveal>GitHub</span>
      <h2 id="github-heading" class="section-title fade-in-up" data-reveal>
        <LucideGithub class="title-icon" />
        Stats &amp; Activity
      </h2>

      <div class="github-grid">
        <!-- Stats Card -->
        <div class="gh-card stats-card fade-in-up stagger-1" data-reveal>
          <div class="card-header">
            <span class="card-icon" style="background: rgba(255, 215, 0, 0.12); color: #ffd700">
              <LucideBarChart2 :size="18" />
            </span>
            <span class="card-title">GitHub Stats</span>
            <a
              href="https://github.com/Patel230"
              target="_blank"
              rel="noopener noreferrer"
              class="card-action"
              aria-label="View GitHub profile"
            >
              <LucideExternalLink :size="14" />
            </a>
          </div>
          <a
            href="https://github.com/Patel230"
            target="_blank"
            rel="noopener noreferrer"
            class="stats-img-link"
          >
            <div v-if="!statsLoaded && !statsError" class="img-shimmer" aria-hidden="true" />
            <img
              v-if="!statsError"
              v-show="statsLoaded"
              src="https://github-readme-stats-sigma-five.vercel.app/api?username=Patel230&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=ffd700&text_color=e5e5e5&icon_color=ffd700&count_private=true"
              alt="GitHub stats for Patel230"
              class="stats-img"
              loading="lazy"
              @load="handleStatsLoad"
              @error="handleStatsError"
            />
            <p v-if="statsError" class="fallback-msg">View GitHub profile for stats</p>
          </a>
        </div>

        <!-- Streak Card -->
        <div class="gh-card streak-card fade-in-up stagger-2" data-reveal>
          <div class="card-header">
            <span class="card-icon" style="background: rgba(249, 115, 22, 0.12); color: #f97316">
              <LucideFlame :size="18" />
            </span>
            <span class="card-title">Contribution Streak</span>
          </div>
          <a
            href="https://github.com/Patel230"
            target="_blank"
            rel="noopener noreferrer"
            class="stats-img-link"
          >
            <div v-if="!streakLoaded && !streakError" class="img-shimmer" aria-hidden="true" />
            <img
              v-if="!streakError"
              v-show="streakLoaded"
              src="https://streak-stats.demolab.com/?user=Patel230&theme=dark&hide_border=true&background=00000000&ring=ffd700&fire=f97316&currStreakLabel=ffd700&sideLabels=b3b3b3"
              alt="GitHub streak for Patel230"
              class="stats-img"
              loading="lazy"
              @load="streakLoaded = true"
              @error="streakError = true"
            />
            <p v-if="streakError" class="fallback-msg">View contributions on GitHub</p>
          </a>
        </div>

        <!-- Top Languages Card -->
        <div class="gh-card langs-card fade-in-up stagger-3" data-reveal>
          <div class="card-header">
            <span class="card-icon" style="background: rgba(139, 92, 246, 0.12); color: #8b5cf6">
              <LucideCode2 :size="18" />
            </span>
            <span class="card-title">Top Languages</span>
          </div>
          <a
            href="https://github.com/Patel230?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="stats-img-link"
          >
            <div v-if="!langsLoaded && !langsError" class="img-shimmer" aria-hidden="true" />
            <img
              v-if="!langsError"
              v-show="langsLoaded"
              src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Patel230&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=8b5cf6&text_color=e5e5e5&langs_count=6"
              alt="Top languages for Patel230"
              class="stats-img"
              loading="lazy"
              @load="langsLoaded = true"
              @error="langsError = true"
            />
            <p v-if="langsError" class="fallback-msg">View repositories on GitHub</p>
          </a>
        </div>

        <!-- Quick Links Card -->
        <div class="gh-card links-card fade-in-up stagger-4" data-reveal>
          <div class="card-header">
            <span class="card-icon" style="background: rgba(34, 197, 94, 0.12); color: #22c55e">
              <LucideLink :size="18" />
            </span>
            <span class="card-title">Quick Links</span>
          </div>
          <div class="quick-links">
            <a
              v-for="link in githubLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="quick-link"
              :style="{ '--link-color': link.color }"
            >
              <span class="ql-icon" :style="{ background: `${link.color}18`, color: link.color }">
                <component :is="link.icon" :size="16" />
              </span>
              <span class="ql-text">{{ link.label }}</span>
              <LucideArrowUpRight :size="14" class="ql-arrow" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import {
  Github as LucideGithub,
  BarChart2 as LucideBarChart2,
  Flame as LucideFlame,
  Code2 as LucideCode2,
  Link as LucideLink,
  ExternalLink as LucideExternalLink,
  ArrowUpRight as LucideArrowUpRight,
  User as LucideUser,
  FolderOpen as LucideFolderOpen,
  GitPullRequest as LucideGitPullRequest,
  Star as LucideStar
} from 'lucide-vue-next'

const statsLoaded = ref(false)
const statsError = ref(false)
const streakLoaded = ref(false)
const streakError = ref(false)
const langsLoaded = ref(false)
const langsError = ref(false)

const handleStatsLoad = () => {
  statsLoaded.value = true
}
const handleStatsError = () => {
  statsError.value = true
}

const githubLinks = [
  { label: 'Profile', href: 'https://github.com/Patel230', icon: LucideUser, color: '#ffd700' },
  {
    label: 'Repositories',
    href: 'https://github.com/Patel230?tab=repositories',
    icon: LucideFolderOpen,
    color: '#22c55e'
  },
  {
    label: 'Pull Requests',
    href: 'https://github.com/Patel230?tab=overview',
    icon: LucideGitPullRequest,
    color: '#8b5cf6'
  },
  {
    label: 'Stars Given',
    href: 'https://github.com/Patel230?tab=stars',
    icon: LucideStar,
    color: '#f97316'
  }
]
</script>

<style scoped>
.github {
  background-color: var(--bg-primary);
}

.title-icon {
  color: #9ca3af;
  width: 28px;
  height: 28px;
}

.section-label {
  color: #9ca3af;
}

/* ── Grid layout ── */
.github-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}

/* ── Shared card base ── */
.gh-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
  transition:
    border-color 0.25s ease,
    transform 0.25s var(--ease-spring),
    box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}

.gh-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-spring);
}

.gh-card:hover {
  border-color: rgba(255, 215, 0, 0.25);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
}

.gh-card:hover::after {
  transform: scaleX(1);
}

/* ── Card header ── */
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.card-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.card-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  flex: 1;
}

.card-action {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.card-action:hover {
  color: var(--accent);
}

/* ── Stats images ── */
.stats-img-link {
  display: block;
}

.stats-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
}

.img-shimmer {
  width: 100%;
  height: 160px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    var(--bg-card) 25%,
    var(--bg-tertiary) 50%,
    var(--bg-card) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.fallback-msg {
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

/* ── Quick links ── */
.quick-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--link-color);
  transform: translateX(4px);
}

.ql-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex-shrink: 0;
}

.ql-text {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
}

.ql-arrow {
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.quick-link:hover .ql-arrow {
  color: var(--link-color);
}

/* ── Responsive ── */
@media (max-width: 1023px) and (min-width: 768px) {
  .github-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

@media (max-width: 767px) {
  .github-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .gh-card {
    padding: 18px;
  }
}

@media (max-width: 479px) {
  .github-grid {
    gap: 12px;
  }

  .gh-card {
    padding: 14px;
  }

  .card-title {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gh-card,
  .gh-card::after,
  .quick-link,
  .img-shimmer {
    transition: none;
    animation: none;
  }

  .gh-card:hover {
    transform: none;
  }

  .quick-link:hover {
    transform: none;
  }
}
</style>
