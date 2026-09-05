<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="scroll-progress" aria-hidden="true" :style="{ width: scrollProgress + '%' }" />
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

      <!-- Navigation Links (desktop bar + mobile full-screen) -->
      <div id="nav-menu" ref="menuRef" class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <router-link
          to="/"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ active: $route.path === '/' && activeSection === '' }"
          :aria-current="$route.path === '/' && activeSection === '' ? 'page' : undefined"
          @click="closeMenu"
        >
          Home
        </router-link>

        <div v-for="group in navGroups" :key="group.label" class="nav-group">
          <button
            class="nav-link nav-group-trigger"
            :class="{ active: groupActive(group.label), 'is-open': openGroups[group.label] }"
            :aria-expanded="openGroups[group.label]"
            :aria-haspopup="true"
            @click="toggleGroup(group.label)"
          >
            {{ group.label }}
            <ChevronDown class="group-chevron" aria-hidden="true" />
          </button>
          <div class="dropdown" :class="{ open: openGroups[group.label] }" role="menu">
            <component
              :is="item.type === 'route' ? RouterLink : 'a'"
              v-for="item in group.items"
              :key="item.label"
              :to="item.type === 'route' ? item.to : undefined"
              :href="item.type === 'section' ? sectionHref(item.id) : undefined"
              class="dropdown-link"
              :class="{ active: itemActive(item) }"
              :aria-current="
                itemActive(item) ? (item.type === 'route' ? 'page' : 'true') : undefined
              "
              role="menuitem"
              @click="handleItemClick(item, $event)"
            >
              {{ item.label }}
            </component>
          </div>
        </div>

        <a
          :href="contactLink"
          class="nav-link contact-nav-link"
          :class="{ active: activeSection === 'contact' }"
          :aria-current="activeSection === 'contact' ? 'true' : undefined"
          @click.prevent="handleNavClick('contact')"
          >Contact</a
        >
        <a
          v-if="resumeUrl"
          :href="resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link resume-nav-link"
        >
          Résumé
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import { useFocusTrap } from '@/composables/useFocusTrap.js'
import { scrollBehavior } from '@/utils/motion.js'
import { resumeUrl } from '@/data/contact.js'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const menuRef = ref(null)
const menuButtonRef = ref(null)
const isScrolled = ref(false)
const scrollProgress = ref(0)
const openGroups = reactive({})

const { activate: trapMenuFocus, deactivate: releaseMenuFocus } = useFocusTrap()

const isHomePage = computed(() => route.path === '/')

const navGroups = [
  {
    label: 'About',
    items: [
      { type: 'section', id: 'about', label: 'About' },
      { type: 'section', id: 'experience', label: 'Experience' },
      { type: 'section', id: 'skills', label: 'Skills' },
      { type: 'section', id: 'portfolio-stack', label: 'Stack' },
      { type: 'route', to: '/blog', label: 'Journey' }
    ]
  },
  {
    label: 'Projects',
    items: [
      { type: 'section', id: 'projects', label: 'Projects' },
      { type: 'route', to: '/creations', label: 'Creations' },
      { type: 'route', to: '/gallery', label: 'Gallery' }
    ]
  },
  {
    label: 'Community',
    items: [
      { type: 'section', id: 'opensource', label: 'Open Source' },
      { type: 'section', id: 'github', label: 'GitHub' }
    ]
  }
]

const sectionHref = id => (isHomePage.value ? `#${id}` : `/#${id}`)
const contactLink = computed(() => sectionHref('contact'))

const activeSection = ref('')
const SECTIONS = [
  'experience',
  'skills',
  'projects',
  'opensource',
  'github',
  'portfolio-stack',
  'about',
  'contact'
]

const itemActive = item => {
  if (item.type === 'route') return route.path === item.to
  return activeSection.value === item.id
}

const groupActive = label => {
  const group = navGroups.find(g => g.label === label)
  return group ? group.items.some(itemActive) : false
}

const closeAllGroups = () => {
  for (const key of Object.keys(openGroups)) openGroups[key] = false
}

const toggleGroup = label => {
  openGroups[label] = !openGroups[label]
}

const handleItemClick = (item, event) => {
  if (item.type === 'section') {
    event.preventDefault()
    handleNavClick(item.id)
  } else {
    activeSection.value = ''
  }
  closeMenu()
  closeAllGroups()
}

let scrollLocked = false
let scrollLockTimer = null

let sectionObserver = null
const visibleSections = new Set()

const refreshActiveSection = () => {
  if (!isHomePage.value || scrollLocked) return
  let current = ''
  for (const id of SECTIONS) {
    if (visibleSections.has(id)) {
      current = id
      break
    }
  }
  activeSection.value = current
}

const setupSectionObserver = () => {
  sectionObserver?.disconnect()
  visibleSections.clear()
  if (!isHomePage.value) return
  sectionObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target.id)
        else visibleSections.delete(entry.target.id)
      }
      refreshActiveSection()
    },
    // Band: below the fixed navbar, top 40% of the viewport
    { rootMargin: '-80px 0px -60% 0px' }
  )
  for (const id of SECTIONS) {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToSection = section => {
  const el = document.getElementById(section)
  if (el) {
    el.scrollIntoView({ behavior: scrollBehavior() })
  }
}

const handleNavClick = async section => {
  closeMenu()
  closeAllGroups()
  activeSection.value = section
  scrollLocked = true
  if (isHomePage.value) {
    scrollToSection(section)
  } else {
    await router.push({ path: '/', hash: `#${section}` })
  }
  clearTimeout(scrollLockTimer)
  scrollLockTimer = setTimeout(() => {
    scrollLocked = false
    refreshActiveSection()
  }, 1500)
}

// Close menus/dropdowns when clicking outside
const handleClickOutside = event => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu()
    closeAllGroups()
  }
}

// Close on escape
const handleEscape = event => {
  if (event.key !== 'Escape') return
  if (isMenuOpen.value) {
    closeMenu()
    menuButtonRef.value?.focus()
  } else {
    closeAllGroups()
  }
}

// Prevent body scroll when mobile menu is open
const preventBodyScroll = prevent => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = prevent ? 'hidden' : ''
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
}

let observerSetupTimer = null

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('scroll', handleScroll, { passive: true })
  observerSetupTimer = setTimeout(setupSectionObserver, 100)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('scroll', handleScroll)
  sectionObserver?.disconnect()
  clearTimeout(observerSetupTimer)
  clearTimeout(scrollLockTimer)
  releaseMenuFocus()
  preventBodyScroll(false)
})

watch(isHomePage, val => {
  if (!val) activeSection.value = ''
  clearTimeout(observerSetupTimer)
  observerSetupTimer = setTimeout(setupSectionObserver, 100)
})

// Toggle body scroll and trap focus while the full-screen menu is open
watch(isMenuOpen, open => {
  preventBodyScroll(open)
  if (open) {
    nextTick(() => {
      if (menuRef.value) trapMenuFocus(menuRef.value, menuButtonRef.value)
    })
  } else {
    releaseMenuFocus()
  }
})
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

.scroll-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, var(--accent), #ffb300);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
  transition: width 0.1s linear;
  z-index: 3;
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
  gap: 2px;
  align-items: center;
  padding: 0 14px;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
  position: relative;
  letter-spacing: 0.01em;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--accent);
  background: rgba(255, 215, 0, 0.06);
}

.nav-link.active {
  color: #fff;
  background: rgba(255, 215, 0, 0.1);
}

/* Push Contact + Résumé to the right as an action group */
.contact-nav-link {
  margin-left: auto;
}

/* Résumé as a distinct action pill */
.resume-nav-link {
  margin-left: 10px;
  color: #000;
  background: var(--accent);
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.35);
}

.resume-nav-link:hover {
  color: #000;
  background: var(--accent-hover);
  filter: brightness(1.05);
}

/* ── Dropdown groups ── */
.nav-group {
  position: relative;
}

.nav-group-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.group-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.nav-group-trigger.is-open .group-chevron {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  min-width: 180px;
  padding: 8px;
  background: rgba(20, 20, 20, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s var(--ease-spring),
    visibility 0.2s;
  z-index: 20;
}

.dropdown.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-link {
  display: block;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.dropdown-link:hover {
  background: rgba(255, 215, 0, 0.08);
  color: var(--accent);
}

.dropdown-link.active {
  color: var(--accent);
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
    gap: 14px;
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
    align-items: stretch;
    gap: 6px;
    transform: translateX(100%);
    visibility: hidden;
    transition:
      transform 0.3s ease,
      visibility 0.3s;
    z-index: 999;
    padding: 24px 24px 30px;
    overflow-y: auto;
    height: calc(100vh - 57px);
  }

  .nav-links.is-open {
    transform: translateX(0);
    visibility: visible;
  }

  .nav-link {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 10px 4px;
  }

  .contact-nav-link {
    margin-left: 0;
  }

  .resume-nav-link {
    margin-left: 0;
    margin-top: 10px;
    text-align: center;
    padding: 12px 4px;
  }

  .nav-group {
    width: 100%;
  }

  .nav-group-trigger {
    justify-content: space-between;
    width: 100%;
  }

  .dropdown {
    position: static;
    transform: none;
    min-width: 0;
    padding: 4px 4px 4px 16px;
    background: none;
    border: none;
    box-shadow: none;
    border-left: 2px solid var(--border);
    margin-left: 8px;
    opacity: 1;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    transition: height 0.25s ease;
  }

  .dropdown.open {
    visibility: visible;
    height: auto;
  }

  .dropdown-link {
    font-size: 1rem;
    padding: 9px 10px;
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
    padding: 20px 20px 30px;
  }

  .nav-link {
    font-size: 1rem;
    padding: 8px 2px;
  }
}

/* Focus visible styles for accessibility */
.nav-link:focus-visible,
.dropdown-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .nav-links,
  .menu-icon span,
  .nav-link,
  .group-chevron,
  .dropdown,
  .dropdown-link {
    transition: none;
  }
}
</style>
