<template>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="container navbar-content">
      <router-link to="/" class="logo" aria-label="Go to homepage">
        <span class="logo-brackets" aria-hidden="true">{LP}</span>
      </router-link>
      
      <!-- Mobile Menu Button -->
      <button 
        ref="menuButtonRef"
        class="mobile-menu-btn" 
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="nav-menu"
        aria-label="Toggle navigation menu"
      >
        <span class="menu-icon" :class="{ 'is-open': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      
      <!-- Navigation Links -->
      <div 
        id="nav-menu"
        ref="menuRef"
        class="nav-links" 
        :class="{ 'is-open': isMenuOpen }"
        @click="handleMenuClick"
      >
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ 'router-link-active': $route.path === '/' }"
          @click="closeMenu"
        >
          Home
        </router-link>
        <router-link 
          to="/creations" 
          class="nav-link"
          @click="closeMenu"
        >
          Creations
        </router-link>
        <a 
          :href="opensourceLink" 
          class="nav-link"
          @click.prevent="handleNavClick('opensource')"
        >
          Open Source
        </a>
        <a 
          :href="githubLink" 
          class="nav-link"
          @click.prevent="handleNavClick('github')"
        >
          GitHub
        </a>
        <a 
          :href="portfolioStackLink" 
          class="nav-link"
          @click.prevent="handleNavClick('portfolio-stack')"
        >
          Stack
        </a>
        <a 
          :href="aboutLink" 
          class="nav-link"
          @click.prevent="handleNavClick('about')"
        >
          About
        </a>
        <a 
          :href="contactLink" 
          class="nav-link"
          @click.prevent="handleNavClick('contact')"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const menuRef = ref(null)
const menuButtonRef = ref(null)

const isHomePage = computed(() => route.path === '/')
const opensourceLink = computed(() => isHomePage.value ? '#opensource' : '/#opensource')
const githubLink = computed(() => isHomePage.value ? '#github' : '/#github')
const portfolioStackLink = computed(() => isHomePage.value ? '#portfolio-stack' : '/#portfolio-stack')
const aboutLink = computed(() => isHomePage.value ? '#about' : '/#about')
const contactLink = computed(() => isHomePage.value ? '#contact' : '/#contact')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleNavClick = (section) => {
  closeMenu()
  
  if (isHomePage.value) {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push({ path: '/', hash: `#${section}` })
  }
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    menuButtonRef.value &&
    !menuButtonRef.value.contains(event.target)
  ) {
    closeMenu()
  }
}

// Close menu on escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
    menuButtonRef.value?.focus()
  }
}

// Prevent body scroll when menu is open
const preventBodyScroll = (prevent) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = prevent ? 'hidden' : ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  preventBodyScroll(false)
})

// Watch menu state to toggle body scroll
watch(isMenuOpen, (newValue) => {
  preventBodyScroll(newValue)
})

const handleMenuClick = (event) => {
  // Close menu when clicking on a link
  if (event.target.classList.contains('nav-link')) {
    closeMenu()
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  padding: 16px 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-brackets {
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
  transition: text-shadow 0.2s ease;
}

.logo:hover .logo-brackets {
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
}

.nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent);
  transition: width 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.mobile-menu-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all 0.3s ease;
}

.menu-icon.is-open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.is-open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-primary);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    padding-top: 70px;
  }

  .nav-links.is-open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .nav-link::after {
    bottom: -8px;
  }
}

/* Focus visible styles for accessibility */
@media (prefers-reduced-motion: reduce) {
  .nav-links {
    transition: none;
  }

  .menu-icon span {
    transition: none;
  }
}
</style>
