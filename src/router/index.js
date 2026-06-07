import { createRouter, createWebHistory } from 'vue-router'
import { useAnalytics } from '@/composables/useAnalytics.js'

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
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Track page views and manage focus
router.afterEach(to => {
  // Update title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Update meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }

  // Track page view
  const { trackPageView } = useAnalytics()
  trackPageView(to.fullPath, to.meta.title || document.title)

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
