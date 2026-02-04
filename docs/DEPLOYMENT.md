# Deployment Guide

This document explains how to deploy the portfolio to various platforms.

## Vercel (Recommended)

This project is optimized for Vercel deployment.

### Automatic Deployment (Git Integration)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Deploy!

3. **Auto-deploy on push**
   Every push to `main` will trigger a new deployment.

### Manual Deployment (CLI)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `lakshman-portfolio-beta.vercel.app`)
3. Follow DNS configuration instructions
4. Enable HTTPS (auto-enabled on Vercel)

## GitHub Pages

### Setup

1. **Update `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/portfolio/',  // Repository name
     // ... rest of config
   })
   ```

2. **Create deployment script**
   Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## Netlify

### Drag & Drop

1. Run `npm run build`
2. Drag the `dist` folder to [app.netlify.com](https://app.netlify.com)

### Git Integration

1. Connect your GitHub repo on Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Docker Deployment

### Build Docker Image

```bash
docker build -t portfolio .
```

### Run Container

```bash
docker run -p 80:80 portfolio
```

### Docker Compose

```yaml
version: '3'
services:
  portfolio:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## Environment Variables

Create `.env.local` for local development (don't commit this):

```bash
# Analytics (optional)
VITE_ANALYTICS_ID=your_analytics_id

# API Keys (if adding backend features)
VITE_API_URL=your_api_url
```

## Build Configuration

The project uses Vite with these build settings:

- **Target:** ESNext (modern browsers)
- **Minification:** Terser
- **CSS Minification:** Enabled
- **Source Maps:** Disabled in production
- **Chunking:** Manual chunks for vendor libraries

## Performance Optimization

### Before Deployment

1. **Optimize images**
   - Use WebP format when possible
   - Compress images in `/public`
   - Use appropriate sizes (don't use 4000px images for 140px display)

2. **Check bundle size**
   ```bash
   npm run build
   ```
   Review the output file sizes.

3. **Run Lighthouse audit**
   - Open production URL in Chrome
   - DevTools → Lighthouse → Generate report
   - Aim for 90+ scores in all categories

## Troubleshooting Deployment

### Build fails on Vercel

1. Check Node.js version in project settings (use 18+)
2. Ensure `package-lock.json` is committed
3. Check build logs for errors

### 404 errors on refresh (GitHub Pages)

Add `404.html` that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=./" />
</head>
<body></body>
</html>
```

### Assets not loading

Ensure `base` path is correctly set in `vite.config.js` for your deployment platform.

## Rollback

### Vercel
- Go to Deployments tab
- Find previous deployment
- Click "Promote to Production"

### General
- Revert commit: `git revert HEAD`
- Push: `git push origin main`
- Auto-deployment will handle the rest
