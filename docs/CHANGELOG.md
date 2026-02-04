# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive responsive design for all devices
- Documentation folder with setup, deployment, and contribution guides
- Portfolio Stack section showing tech stack used to build the portfolio

### Fixed
- Cursor position in typing animation (now stays inline)
- Mobile menu positioning (now properly below navbar)
- Profile picture centering on mobile devices
- Mobile menu height calculation

## [1.0.0] - 2026-02-04

### Added
- **Hero Section** with typing animation effect
- **About Section** with personal info and education
- **Skills Section** with categorized technologies
- **Projects Section** featuring 6 highlighted projects
- **Open Source Section** showcasing Kilo and Sim Studio contributions
- **GitHub Stats Section** with stats card and quick links
- **Portfolio Stack Section** displaying build technologies
- **Contact Section** with 6 contact methods
- **Footer** with attribution
- **404 Page** for unknown routes
- **Mobile Navigation** with hamburger menu
- **Scroll to Top** button
- **Dark Theme** with amber accent color
- **Responsive Design** for mobile, tablet, and desktop
- **Accessibility Features**:
  - Semantic HTML5
  - ARIA labels
  - Keyboard navigation
  - Skip to content link
  - Reduced motion support
- **SEO Optimization**:
  - Meta tags
  - Open Graph tags
  - Twitter Cards
  - Structured data (JSON-LD)
  - Canonical URLs
- **PWA Features**:
  - Manifest.json
  - Service Worker
  - Icons for all platforms

### Tech Stack
- Vue 3 with Composition API
- Vue Router 4
- Vite (build tool)
- TypeScript
- Custom CSS (no framework)
- Vitest (testing)
- ESLint + Prettier

### Design Decisions
- Minimal dependencies for performance
- CSS variables for theming
- Scoped styles in components
- Mobile-first responsive approach
- Lazy loading for images

## Roadmap

### Planned
- [ ] Dark/Light mode toggle
- [ ] Blog section with markdown support
- [ ] i18n internationalization
- [ ] Privacy-focused analytics
- [ ] RSS feed
- [ ] Sitemap generation
- [ ] Improved accessibility (WCAG 2.1 AA)
- [ ] More animations (optional)
- [ ] Case study pages for projects

### Under Consideration
- [ ] CMS integration (Strapi/Contentful)
- [ ] Backend for contact form
- [ ] Newsletter signup
- [ ] Project filtering/search
- [ ] Tags system

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-02-04 | Initial release |

---

## How to Update This Changelog

When making changes:

1. Add to `[Unreleased]` section during development
2. Move to version section when releasing
3. Follow categories:
   - `Added` - New features
   - `Changed` - Changes to existing functionality
   - `Deprecated` - Soon-to-be removed features
   - `Removed` - Removed features
   - `Fixed` - Bug fixes
   - `Security` - Security improvements

Example:
```markdown
### Added
- New feature X

### Fixed
- Bug in feature Y
```
