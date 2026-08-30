/**
 * Generates the raster brand assets referenced by index.html / browserconfig.xml:
 *   public/apple-touch-icon.png  (180x180)
 *   public/mstile-150x150.png    (150x150)
 *   public/og-image.png          (1200x630 social share card)
 *
 * Run: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = file => resolve(root, 'public', file)

const BG = '#0d0d0d'
const ACCENT = '#fbbf24'
const MONO = "'SF Mono', 'Fira Code', 'Consolas', 'Menlo', monospace"

const iconSvg = size => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${BG}"/>
  <text x="50" y="66" font-family="${MONO}" font-size="40" font-weight="700"
        fill="${ACCENT}" text-anchor="middle">{LP}</text>
</svg>`

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>
  <text x="80" y="180" font-family="${MONO}" font-size="40" font-weight="700" fill="${ACCENT}">{LP}</text>
  <text x="80" y="310" font-family="${MONO}" font-size="72" font-weight="800" fill="#ffffff">Lakshman Patel</text>
  <text x="80" y="385" font-family="${MONO}" font-size="34" fill="#a3a3a3">Full Stack Developer &amp; AI Engineer</text>
  <text x="80" y="520" font-family="${MONO}" font-size="26" fill="#737373">lakshmanp.com</text>
</svg>`

async function render(svg, file, size) {
  await sharp(Buffer.from(svg), { density: 300 }).resize(size.w, size.h).png().toFile(out(file))
  console.log(`  ✓ ${file} (${size.w}x${size.h})`)
}

await render(iconSvg(180), 'apple-touch-icon.png', { w: 180, h: 180 })
await render(iconSvg(150), 'mstile-150x150.png', { w: 150, h: 150 })
await render(ogSvg, 'og-image.png', { w: 1200, h: 630 })
console.log('Brand assets written to public/')
