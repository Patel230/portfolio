import { createRouter, createWebHistory } from 'vue-router'
import { useAnalytics } from '@/composables/useAnalytics.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Lakshman Patel | Full Stack Developer',
      description: 'Full Stack Developer building intelligent applications with AI. 3+ years experience in Python, TypeScript, and cloud infrastructure.'
    }
  },
  {
    path: '/pocs',
    name: 'Creations',
    component: () => import('@/views/PocsView.vue'),
    meta: {
      title: 'Projects & Creations | Lakshman Patel',
      description: 'Explore 30+ open source projects and proof-of-concept implementations by Lakshman Patel.'
    }
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

// Track page views
router.afterEach((to) => {
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
})

export default router
