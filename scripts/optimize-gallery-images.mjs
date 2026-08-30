/**
 * Converts every PNG under public/images/gallery/ to WebP:
 *   foo.png -> foo.webp        (full size, max 1600px wide, q80 — carousel)
 *   foo.png -> foo-thumb.webp  (640px wide, q75 — grid cards + thumbnail strip)
 * then deletes the source PNG. The app derives thumb paths by replacing
 * ".webp" with "-thumb.webp" (see src/utils/galleryImages.js).
 *
 * Run after adding new screenshots: node scripts/optimize-gallery-images.mjs
 * (idempotent: PNGs already converted no longer exist, WebPs are skipped)
 */
import sharp from 'sharp'
import { readdir, rm, stat } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const galleryDir = join(root, 'public/images/gallery')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

let converted = 0
let savedBytes = 0

for await (const file of walk(galleryDir)) {
  if (!file.endsWith('.png')) continue
  const webp = file.replace(/\.png$/, '.webp')
  const thumb = file.replace(/\.png$/, '-thumb.webp')
  const before = (await stat(file)).size

  await sharp(file)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webp)
  await sharp(file)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(thumb)
  await rm(file)

  const after = (await stat(webp)).size + (await stat(thumb)).size
  savedBytes += before - after
  converted++
  if (converted % 50 === 0) console.log(`  ...${converted} converted`)
}

console.log(`Converted ${converted} PNGs, saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB`)
