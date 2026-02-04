# Frequently Asked Questions

## General Questions

### Q: Is this portfolio built with a framework?
**A:** Yes, it's built with **Vue 3** using the Composition API. The build tool is **Vite**.

### Q: Can I use this portfolio as a template?
**A:** Yes! This project is MIT licensed. You can fork it and customize it for your own use. Just please give credit by keeping a link to the original or mentioning the inspiration.

### Q: How do I change the colors/theme?
**A:** Edit CSS variables in `src/style.css`:
```css
:root {
  --accent: #fbbf24;        /* Change this to your brand color */
  --bg-primary: #0d0d0d;    /* Background color */
  --text-primary: #ffffff;   /* Text color */
}
```

### Q: Is this portfolio responsive?
**A:** Yes! It's fully responsive and works on all devices - mobile, tablet, and desktop. It has 6 breakpoints to ensure optimal viewing on any screen size.

## Technical Questions

### Q: How do I add a new project?
**A:** Edit `src/data/projects.js` and add your project:
```javascript
{
  title: 'Your Project Name',
  description: 'Brief description of the project.',
  tech: ['Technology1', 'Technology2', 'Technology3'],
  link: 'https://your-project-url.com',
  icon: 'icon-name',
  color: '#hexcolor'
}
```

### Q: How do I add a new skill?
**A:** Edit `src/data/skills.js` and add to the appropriate category:
```javascript
{
  name: 'Category Name',
  icon: 'icon-name',
  color: '#hexcolor',
  skills: ['Skill1', 'Skill2', 'Skill3']
}
```

### Q: How do I change my profile picture?
**A:** Replace `/public/lakshman.jpg` with your own image. Keep the same filename or update the reference in `HeroSection.vue`.

### Q: How do I update my social links?
**A:** Edit `src/sections/ContactSection.vue` and update the `contactItems` array with your links.

### Q: Can I add a blog section?
**A:** Yes, but it requires additional setup:
1. Create a new view: `src/views/BlogView.vue`
2. Add blog posts data file: `src/data/blogs.js`
3. Add route in `src/router/index.js`
4. Add navigation link in `NavBar.vue`

## Deployment Questions

### Q: How do I deploy to Vercel?
**A:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions. Quick steps:
1. Push to GitHub
2. Import project on Vercel
3. Auto-deploy on every push

### Q: How do I use a custom domain?
**A:** In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate is auto-provisioned

### Q: My deployment failed, what do I do?
**A:** 
1. Check build logs on Vercel
2. Run `npm run build` locally to see errors
3. Common issues:
   - Missing dependencies: Run `npm install`
   - Lint errors: Run `npm run lint:check`
   - Type errors: Run `npm run typecheck`

### Q: How do I enable HTTPS?
**A:** HTTPS is automatically enabled on Vercel. For other platforms, you may need to configure SSL certificates manually.

## Performance Questions

### Q: Why is my portfolio loading slowly?
**A:** Check these:
1. **Image sizes** - Compress images, use WebP format
2. **Bundle size** - Run `npm run build` and check output
3. **Third-party scripts** - Remove unused scripts
4. **Font loading** - Use `font-display: swap`

### Q: How can I improve performance?
**A:**
1. Use `loading="lazy"` on images below the fold
2. Compress images before adding to `/public`
3. Remove unused code and dependencies
4. Enable gzip/brotli compression (usually auto on Vercel)

### Q: What's the Lighthouse score?
**A:** The portfolio is optimized for:
- **Performance:** 90-100
- **Accessibility:** 95-100
- **Best Practices:** 95-100
- **SEO:** 90-100

Run your own audit in Chrome DevTools → Lighthouse.

## Customization Questions

### Q: How do I add animations?
**A:** You can:
1. Use CSS animations (recommended for simple effects)
2. Use Vue transitions
3. Install GSAP for complex animations

### Q: How do I add dark/light mode toggle?
**A:** This requires:
1. Add a toggle button in the navbar
2. Use CSS variables for theming
3. Store preference in localStorage
4. Toggle class on `<html>` element

Example implementation:
```javascript
const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
```

### Q: How do I add Google Analytics?
**A:** Add this to `index.html` head:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

Or use privacy-focused alternatives like Plausible or Fathom.

### Q: How do I add a contact form?
**A:** Options:
1. **Netlify Forms** - If using Netlify
2. **Formspree** - `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
3. **Getform**
4. **Custom backend** - Build your own API

## Troubleshooting

### Q: Images not showing on deployment?
**A:** 
- Check image path (case-sensitive on Linux)
- Ensure images are in `/public` folder
- Use relative paths: `/image.jpg` not `../image.jpg`

### Q: Fonts not loading?
**A:**
- Check font URL is correct
- Use `font-display: swap` to prevent FOIT
- Preload critical fonts in `index.html`

### Q: Routes not working on refresh?
**A:**
- Configure SPA fallback on your hosting platform
- Vercel: Auto-configured
- Netlify: Add `_redirects` file with `/* /index.html 200`

### Q: Build fails with "Cannot find module"?
**A:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Still Have Questions?

- Open an issue on GitHub
- Email: lakshmanp230@gmail.com
- Check [SETUP.md](./SETUP.md) for development setup
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
