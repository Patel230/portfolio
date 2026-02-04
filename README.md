# Lakshman Patel Portfolio

A modern, responsive portfolio website built with Vue 3 and Vite.

![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Features

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Modern Dark Theme** - Inspired by kilo.ai design
- 📱 **Responsive Design** - Works perfectly on all devices
- ♿ **Accessible** - ARIA labels, keyboard navigation, reduced motion support
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data
- 🚀 **Production Ready** - Docker support, optimized builds
- 🌙 **Smooth Animations** - CSS transitions with reduced motion support
- 🧩 **Component Based** - Clean, modular Vue 3 composition API

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **Vue Router 4** (Lazy-loaded routes)
- **Vite 5** (Build tool)
- **CSS3** (Custom properties, Grid, Flexbox)
- **ESLint + Prettier** (Code quality)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs at `http://localhost:3681`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint and Format

```bash
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

## Docker

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 4173:4173 portfolio
```

## Project Structure

```
portfolio/
├── public/                  # Static assets
│   ├── lakshman.jpg
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/             # Images and fonts
│   ├── components/         # Vue components
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── ContactSection.vue
│   │   ├── FooterSection.vue
│   │   ├── NavBar.vue
│   │   └── Icon.vue
│   ├── data/               # Static data
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── pocs.js
│   ├── router/             # Vue Router
│   │   └── index.js
│   ├── views/              # Page views
│   │   ├── HomeView.vue
│   │   ├── PocsView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css           # Global styles + CSS variables
├── index.html
├── vite.config.js
├── package.json
├── Dockerfile
├── .eslintrc.cjs
├── .prettierrc
└── .gitignore
```

## Customization

Edit the data files to customize:

- `src/data/skills.js` - Update skills categories
- `src/data/projects.js` - Update featured projects
- `src/data/pocs.js` - Update POC websites list
- `src/components/ContactSection.vue` - Update contact information
- `index.html` - Update SEO meta tags

## Accessibility Features

- ✅ Skip-to-content link
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Reduced motion support (`prefers-reduced-motion`)
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

## Performance Optimizations

- Lazy-loaded routes
- Image optimization with lazy loading
- CSS custom properties for theming
- Manual chunk splitting
- Backdrop filter for smooth navbar
- Optimized scrollbar styling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## License

MIT License - feel free to use this template for your own portfolio!

## Author

**Lakshman Patel**

- GitHub: [@Patel230](https://github.com/Patel230)
- LinkedIn: [lakshman-patel](https://linkedin.com/in/lakshman-patel)
- X (Twitter): [@Lakshman2302](https://x.com/Lakshman2302)

---

Built with ❤️ and ☕ using Vue 3 + Vite
