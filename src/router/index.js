import { createRouter, createWebHistory } from 'vue-router'
import { scrollBehavior as motionScrollBehavior } from '@/utils/motion.js'

// Prevent browser from interfering with Vue Router's scroll management
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Lakshman Patel | Full Stack Developer',
      description:
        'Full Stack Developer building intelligent applications with AI. 3+ years experience in Python, TypeScript, and cloud infrastructure.'
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: {
      title: 'Project Gallery | Lakshman Patel',
      description: 'Explore all 30+ projects with detailed image galleries and screenshots.'
    }
  },
  {
    path: '/creations',
    name: 'Creations',
    component: () => import('@/views/PocsView.vue'),
    meta: {
      title: 'Projects & Creations | Lakshman Patel',
      description:
        'Explore 30+ open source projects and proof-of-concept implementations by Lakshman Patel.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogView.vue'),
    meta: {
      title: 'Journey | Lakshman Patel',
      description:
        'From Monarch Tractor to a layoff on Nov 12, 2025 — and the AI-powered building sprint that followed. The real story.'
    }
  },
  {
    path: '/pocs',
    redirect: '/creations'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '404 - Page Not Found | Lakshman Patel',
      description: 'The page you are looking for does not exist.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: motionScrollBehavior()
      }
    } else {
      return { top: 0 }
    }
  }
})

// Keep per-route meta tags in sync and manage focus
router.afterEach(to => {
  const title = to.meta.title
  const description = to.meta.description

  // Update title
  if (title) {
    document.title = title
  }

  // Update meta description
  if (description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
  }

  // Canonical and social URLs must reflect the current route, not the homepage
  const pageUrl = window.location.origin + to.path
  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('link[rel="canonical"]', 'href', pageUrl)
  setMeta('meta[property="og:url"]', 'content', pageUrl)
  setMeta('meta[name="twitter:url"]', 'content', pageUrl)

  // Social crawlers do not run JS, but keeping these in sync ensures any
  // client-side scraper and the static HTML share consistent values.
  if (title) {
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[name="twitter:title"]', 'content', title)
  }
  if (description) {
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }

  // Move focus to main content for keyboard/AT users after page transition
  setTimeout(() => {
    const main = document.getElementById('main-content')
    if (main && !main.contains(document.activeElement)) {
      main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    }
  }, 100)
})

export default router
