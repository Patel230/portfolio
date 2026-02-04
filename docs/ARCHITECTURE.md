# Architecture

This document describes the architecture and design decisions of the portfolio.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Vue 3 (Composition API) |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Routing** | Vue Router 4 |
| **Styling** | CSS Variables + Scoped CSS |
| **Testing** | Vitest |
| **Linting** | ESLint + Prettier |

## Design Philosophy

### Performance First
- **No CSS Framework** - Custom CSS for minimal bundle size
- **Lazy Loading** - Images load as needed
- **Code Splitting** - Automatic chunking by Vite
- **Minimal Dependencies** - Only Vue + Vue Router

### Accessibility
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- `prefers-reduced-motion` support
- Skip-to-content link

### Responsive Design
- Mobile-first approach
- CSS Grid + Flexbox
- 6 breakpoints (XS to XL)
- Fluid typography

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Icon.vue        # SVG icon component
│   └── ui/             # UI primitives
│       ├── ErrorBoundary.vue
│       ├── LoadingSpinner.vue
│       ├── ScrollToTop.vue
│       └── UpdatePrompt.vue
│
├── composables/        # Vue composables (shared logic)
│   ├── useAnalytics.js
│   ├── useMediaQuery.js
│   └── useScrollSpy.js
│
├── data/               # Static data
│   ├── skills.js       # Skills categorized
│   ├── projects.js     # Featured projects
│   └── pocs.js         # All 30+ projects
│
├── layout/             # Layout components
│   └── NavBar.vue      # Fixed navigation
│
├── router/             # Routing configuration
│   └── index.js
│
├── sections/           # Page sections
│   ├── HeroSection.vue         # Landing hero
│   ├── AboutSection.vue        # About + info
│   ├── SkillsSection.vue       # Tech stack
│   ├── ProjectsSection.vue     # Featured work
│   ├── OpenSourceSection.vue   # Contributions
│   ├── GitHubSection.vue       # GitHub stats
│   ├── PortfolioStackSection.vue # Build stack
│   ├── ContactSection.vue      # Contact links
│   └── FooterSection.vue       # Footer
│
├── views/              # Page views
│   ├── HomeView.vue    # Landing page
│   ├── PocsView.vue    # All projects
│   └── NotFoundView.vue # 404 page
│
├── App.vue             # Root component
├── main.js             # Entry point
└── style.css           # Global styles
```

## Component Architecture

### Single File Components (SFC)
Each `.vue` file contains:
```vue
<template>
  <!-- HTML structure -->
</template>

<script setup>
  // Component logic (Composition API)
</script>

<style scoped>
  /* Component styles (scoped) */
</style>
```

### Component Patterns

#### Presentational Components
- Pure UI, no business logic
- Props in, events out
- Examples: `Icon.vue`, `LoadingSpinner.vue`

#### Section Components
- Full-width page sections
- Self-contained with own data
- Examples: `HeroSection.vue`, `AboutSection.vue`

#### Layout Components
- Structural components
- Wrap other components
- Example: `NavBar.vue`

## State Management

No global state management (Vuex/Pinia) needed. Each component manages its own state using:

```javascript
// Reactive state
const isMenuOpen = ref(false)
const projects = ref([])

// Computed properties
const isHomePage = computed(() => route.path === '/')

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
```

## Styling Architecture

### CSS Variables (Custom Properties)
Defined in `style.css`:
```css
:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #141414;
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --accent: #fbbf24;
  --border: #262626;
}
```

### Scoped Styles
Each component has scoped styles to prevent conflicts:
```vue
<style scoped>
.hero-title {
  /* Only affects this component */
  color: var(--accent);
}
</style>
```

### Responsive Breakpoints
```css
/* Extra Small */
@media (max-width: 319px) { }

/* Mobile Small */
@media (max-width: 479px) { }

/* Mobile Large */
@media (max-width: 767px) { }

/* Tablet */
@media (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

## Routing

### Route Configuration
```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/creations',
    name: 'creations',
    component: PocsView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]
```

### Hash Navigation
For in-page navigation:
```html
<a href="#about">About</a>
<!-- Smooth scrolls to #about section -->
```

## Performance Optimizations

### Build Optimizations
- **Code Splitting** - Automatic by Vite
- **Tree Shaking** - Removes unused code
- **Minification** - Terser for JS/CSS
- **Asset Optimization** - Hashed filenames for caching

### Runtime Optimizations
- **Lazy Loading** - Images use `loading="lazy"`
- **Intersection Observer** - ScrollToTop visibility
- **Debounce/Throttle** - Scroll and resize events
- **will-change** - CSS hints for animations

### Bundle Size
```
vendor.js     ~99KB (Vue + Router)
HomeView.js   ~20KB (Home page)
index.js      ~13KB (Shared code)
Icon.js       ~10KB (Icons)
```

Total: ~150KB (gzipped)

## Security Considerations

1. **No Sensitive Data** - No API keys in client code
2. **noopener noreferrer** - External links use these
3. **Content Security Policy** - Can be added via headers
4. **XSS Prevention** - Vue's template syntax auto-escapes

## Future Enhancements

Potential improvements:

1. **i18n** - Internationalization support
2. **Blog** - Add blog section with markdown
3. **Dark/Light Toggle** - Theme switching
4. **Analytics** - Privacy-focused analytics
5. **PWA** - Service worker for offline
6. **CMS** - Headless CMS for content

## Decision Log

| Decision | Reason |
|----------|--------|
| Vue 3 over React | Better performance, smaller bundle |
| No CSS Framework | Full control, minimal size |
| Vite over Webpack | Faster dev, simpler config |
| No State Management | Overkill for static site |
| Hash routing for sections | Smooth scroll, no page reload |
| CSS Variables | Easy theming, maintainable |

## References

- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Vue Router Docs](https://router.vuejs.org/)
