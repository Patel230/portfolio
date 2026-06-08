<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="container navbar-content">
      <router-link to="/" class="logo" aria-label="Go to homepage">
        <span class="logo-brackets" aria-hidden="true">{LP}</span>
      </router-link>

      <!-- Mobile Menu Button -->
      <button
        ref="menuButtonRef"
        class="mobile-menu-btn"
        :aria-expanded="isMenuOpen"
        aria-controls="nav-menu"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="menu-icon" :class="{ 'is-open': isMenuOpen }">
          <span />
          <span />
          <span />
        </span>
      </button>

      <!-- Navigation Links -->
      <div id="nav-menu" ref="menuRef" class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <router-link
          to="/"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ active: $route.path === '/' && activeSection === '' }"
          @click="closeMenu"
        >
          Home
        </router-link>
        <a
          :href="skillsLink"
          class="nav-link"
          :class="{ active: activeSection === 'skills' }"
          @click.prevent="handleNavClick('skills')"
          >Skills</a
        >
        <a
          :href="projectsLink"
          class="nav-link"
          :class="{ active: activeSection === 'projects' }"
          @click.prevent="handleNavClick('projects')"
          >Projects</a
        >
        <router-link
          to="/creations"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ active: $route.path === '/creations' }"
          @click="closeMenu"
          >Creations</router-link
        >
        <router-link
          to="/gallery"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ active: $route.path === '/gallery' }"
          @click="closeMenu"
          >Gallery</router-link
        >
        <a
          :href="opensourceLink"
          class="nav-link"
          :class="{ active: activeSection === 'opensource' }"
          @click.prevent="handleNavClick('opensource')"
          >Open Source</a
        >
        <a
          :href="githubLink"
          class="nav-link"
          :class="{ active: activeSection === 'github' }"
          @click.prevent="handleNavClick('github')"
          >GitHub</a
        >
        <a
          :href="stackLink"
          class="nav-link"
          :class="{ active: activeSection === 'portfolio-stack' }"
          @click.prevent="handleNavClick('portfolio-stack')"
          >Stack</a
        >
        <router-link
          to="/blog"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ active: $route.path === '/blog' }"
          @click="closeMenu"
          >Journey</router-link
        >
        <a
          :href="aboutLink"
          class="nav-link"
          :class="{ active: activeSection === 'about' }"
          @click.prevent="handleNavClick('about')"
          >About</a
        >
        <a
          :href="contactLink"
          class="nav-link"
          :class="{ active: activeSection === 'contact' }"
          @click.prevent="handleNavClick('contact')"
          >Contact</a
        >
        <div class="nav-indicator" ref="indicatorRef" />
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
const isScrolled = ref(false)

const isHomePage = computed(() => route.path === '/')

const sectionHref = id => (isHomePage.value ? `#${id}` : `/#${id}`)
const skillsLink = computed(() => sectionHref('skills'))
const projectsLink = computed(() => sectionHref('projects'))
const opensourceLink = computed(() => sectionHref('opensource'))
const githubLink = computed(() => sectionHref('github'))
const stackLink = computed(() => sectionHref('portfolio-stack'))
const aboutLink = computed(() => sectionHref('about'))
const contactLink = computed(() => sectionHref('contact'))

const indicatorRef = ref(null)
const activeSection = ref('')
const SECTIONS = [
  'skills',
  'projects',
  'opensource',
  'github',
  'portfolio-stack',
  'about',
  'contact'
]

let scrollLocked = false

const updateActiveSection = () => {
  if (!isHomePage.value || scrollLocked) return
  const navHeight = 80
  const threshold = window.scrollY + navHeight + 20
  const positions = SECTIONS.map(id => {
    const el = document.getElementById(id)
    if (!el) return null
    return { id, top: el.getBoundingClientRect().top + window.scrollY }
  })
    .filter(Boolean)
    .sort((a, b) => a.top - b.top)

  let current = ''
  for (const { id, top } of positions) {
    if (top <= threshold) current = id
  }
  activeSection.value = current
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const updateIndicator = () => {
  if (!indicatorRef.value) return
  const navLinks = indicatorRef.value.parentElement
  if (!navLinks) return
  const activeEl = navLinks.querySelector('.nav-link.active')
  if (activeEl) {
    const navRect = navLinks.getBoundingClientRect()
    const linkRect = activeEl.getBoundingClientRect()
    const gap = 12
    indicatorRef.value.style.width = `${linkRect.width + gap * 2}px`
    indicatorRef.value.style.transform = `translateY(-50%) translateX(${linkRect.left - navRect.left - gap}px)`
    indicatorRef.value.style.opacity = '1'
  } else {
    indicatorRef.value.style.opacity = '0'
  }
}

const scrollToSection = section => {
  const el = document.getElementById(section)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavClick = async section => {
  closeMenu()
  activeSection.value = section
  scrollLocked = true
  if (isHomePage.value) {
    scrollToSection(section)
  } else {
    await router.push({ path: '/', hash: `#${section}` })
  }
  setTimeout(() => {
    scrollLocked = false
    updateActiveSection()
  }, 1500)
}

// Close menu when clicking outside
const handleClickOutside = event => {
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
const handleEscape = event => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
    menuButtonRef.value?.focus()
  }
}

// Prevent body scroll when menu is open
const preventBodyScroll = prevent => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = prevent ? 'hidden' : ''
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  updateActiveSection()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('scroll', handleScroll, { passive: true })
  if (isHomePage.value) updateActiveSection()
  setTimeout(updateIndicator, 50)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('scroll', handleScroll)
  preventBodyScroll(false)
})

watch(isHomePage, val => {
  if (val) setTimeout(updateActiveSection, 100)
  else activeSection.value = ''
  setTimeout(updateIndicator, 150)
})

// Watch menu state to toggle body scroll
watch(isMenuOpen, newValue => {
  preventBodyScroll(newValue)
})

watch(activeSection, () => {
  setTimeout(updateIndicator, 50)
})

watch(
  () => route.path,
  () => {
    setTimeout(updateIndicator, 100)
  }
)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
  padding: 16px 0;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.navbar.scrolled {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  background-color: rgba(13, 13, 13, 0.95);
}

.navbar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
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
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  transition: filter 0.2s ease;
}

.logo:hover .logo-brackets {
  filter: brightness(1.2);
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  will-change: transform;
  padding: 0 14px;
}

.nav-links::-webkit-scrollbar {
  display: none;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  position: relative;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active,
.nav-link.active {
  color: var(--accent);
}

.nav-link.active,
.nav-link.router-link-active {
  color: #fff;
}

.nav-links {
  position: relative;
}

.nav-indicator {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 0;
  height: calc(100% + 20px);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.18), rgba(255, 215, 0, 0.08));
  border: 1.5px solid rgba(255, 215, 0, 0.45);
  border-radius: 999px;
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.15),
    inset 0 0 20px rgba(255, 215, 0, 0.04);
  transition:
    transform 0.4s var(--ease-spring),
    width 0.4s var(--ease-spring),
    opacity 0.25s ease;
  pointer-events: none;
  will-change: transform, width;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.nav-link {
  position: relative;
  z-index: 1;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
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
  border-radius: 2px;
}

.menu-icon.is-open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background-color: var(--accent);
}

.menu-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.is-open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  background-color: var(--accent);
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .nav-links {
    gap: 20px;
  }

  .nav-link {
    font-size: 0.8rem;
  }
}

/* Mobile Styles (< 768px) */
@media (max-width: 767px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 57px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(13, 13, 13, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 999;
    padding-top: 30px;
    overflow-y: auto;
    height: calc(100vh - 57px);
    padding-bottom: 30px;
  }

  .nav-links.is-open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .nav-indicator {
    display: none;
  }
}

/* Mobile Small (< 480px) */
@media (max-width: 479px) {
  .navbar {
    padding: 12px 0;
    height: 49px;
  }

  .logo-brackets {
    font-size: 1.25rem;
  }

  .nav-links {
    top: 49px;
    height: calc(100vh - 49px);
    gap: 12px;
    padding-top: 20px;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 8px 0;
  }

  .menu-icon {
    width: 20px;
    gap: 4px;
  }

  .menu-icon span {
    height: 1.5px;
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

  .nav-link {
    transition: none;
  }

  .nav-indicator {
    transition: none;
  }
}
</style>
