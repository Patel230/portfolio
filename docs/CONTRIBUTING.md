# Contributing Guidelines

Thank you for your interest in contributing to this portfolio project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/portfolio.git`
3. Follow the [Setup Guide](./SETUP.md)
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Before You Start

- Check existing [issues](https://github.com/Patel230/portfolio/issues) or create one
- Discuss major changes before implementing
- Ensure your change aligns with the project's goals

### Making Changes

1. **Write code**
   - Follow the existing code style
   - Use Vue 3 Composition API
   - Keep components small and focused
   - Add comments for complex logic

2. **Test your changes**
   ```bash
   npm run lint      # Check linting
   npm run format    # Format code
   npm run test      # Run tests
   npm run build     # Ensure build passes
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Build process, dependencies, etc.

**Examples:**
```
feat: add typing animation to hero section
fix: resolve mobile menu positioning issue
docs: update deployment instructions
style: format code with prettier
```

## Code Style

### Vue Components

```vue
<script setup>
// Imports first
import { ref, computed } from 'vue'
import { Icon } from '@/components'

// Props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
})

// Emits
const emit = defineEmits(['click', 'update'])

// Reactive state
const count = ref(0)
const isActive = ref(false)

// Computed
const displayName = computed(() => props.name.toUpperCase())

// Methods
const handleClick = () => {
  count.value++
  emit('click', count.value)
}
</script>

<template>
  <button 
    class="btn"
    :class="{ active: isActive }"
    @click="handleClick"
  >
    {{ displayName }}: {{ count }}
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  background: var(--accent);
  color: var(--bg-primary);
}

.btn.active {
  background: var(--accent-hover);
}
</style>
```

### CSS Guidelines

- Use CSS variables for colors/sizes
- BEM naming convention (optional but consistent)
- Mobile-first media queries
- Keep specificity low

```css
/* Good */
.hero-title {
  font-size: 2rem;
  color: var(--accent);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }
}

/* Avoid */
.hero .title {
  font-size: 2rem !important;
}
```

### JavaScript/TypeScript

- Use `const` and `let` (no `var`)
- Prefer arrow functions
- Use destructuring
- Add JSDoc for complex functions

```javascript
// Good
const { name, age } = user
const handleClick = (event) => { ... }

// Avoid
var name = user.name
function handleClick(event) { ... }
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all checks pass**:
   - Linting: `npm run lint`
   - Tests: `npm run test`
   - Build: `npm run build`
4. **Fill out PR template** with:
   - Description of changes
   - Screenshots (if UI changes)
   - Related issue numbers
5. **Request review** from maintainers
6. **Address feedback** promptly

## What to Contribute

### Welcome Contributions

- Bug fixes
- Performance improvements
- Accessibility enhancements
- Documentation improvements
- New features (discuss first)
- Translation/i18n support

### Not Accepting

- Complete redesigns (personal preference)
- Features that require backend/database
- Heavy dependencies
- Code that doesn't pass linting/tests

## Reporting Bugs

Use GitHub Issues with this template:

```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What should happen

**Screenshots:**
If applicable

**Environment:**
- OS: [e.g., iOS, Windows]
- Browser: [e.g., Chrome, Safari]
- Version: [e.g., 22]

**Additional Context:**
Any other information
```

## Feature Requests

Use GitHub Issues with:
- Clear use case
- Why it would be useful
- Possible implementation approach

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Accept differing viewpoints

## Questions?

- Open an issue for questions
- Or contact: lakshmanp230@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
