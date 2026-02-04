# Development Setup

This guide will help you set up the portfolio project for local development.

## Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn**, **pnpm**)
- **Git**

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Patel230/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3681`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint and fix issues |
| `npm run lint:check` | Check for linting issues without fixing |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:ui` | Run tests with UI |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
portfolio/
├── docs/                    # Documentation files
├── public/                  # Static assets (images, icons)
├── src/
│   ├── components/          # Vue components
│   │   ├── Icon.vue
│   │   └── ui/             # UI components
│   ├── composables/        # Vue composables
│   ├── data/               # Static data (skills, projects)
│   ├── layout/             # Layout components (NavBar)
│   ├── router/             # Vue Router configuration
│   ├── sections/           # Page sections (Hero, About, etc.)
│   ├── views/              # Page views
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Environment Variables

This project doesn't require any environment variables for basic setup. For deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Troubleshooting

### Port already in use
If port 3681 is taken, Vite will automatically try the next available port (3682, 3683, etc.).

### Build errors
1. Clear `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check Node.js version:
   ```bash
   node --version  # Should be 18+
   ```

## IDE Setup

### VS Code Extensions (Recommended)

- **Volar** - Vue 3 support
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - CSS autocomplete

### Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) if you want to contribute
