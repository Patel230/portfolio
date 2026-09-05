/**
 * Generates a 900px "medium" WebP variant for every full-size gallery image:
 *   foo.webp -> foo-900.webp  (900px wide, q78 — lightbox carousel on small screens)
 * The app resolves it via src/utils/galleryImages.js `mediumSrc()`.
 *
 * Idempotent: files that already have a -900.webp sibling are skipped.
 * Run after adding new screenshots: node scripts/generate-gallery-medium.mjs
 */
import sharp from 'sharp'
import { readdir, access } from 'fs/promises'
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

let generated = 0

for await (const file of walk(galleryDir)) {
  if (!file.endsWith('.webp') || file.endsWith('-thumb.webp')) continue
  const medium = file.replace(/\.webp$/, '-900.webp')
  try {
    await access(medium)
    continue // already exists
  } catch {
    /* not present — generate it */
  }
  const meta = await sharp(file).metadata()
  if (meta.width && meta.width <= 900) continue // already small enough

  await sharp(file)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(medium)
  generated++
  if (generated % 50 === 0) console.log(`  ...${generated} generated`)
}

console.log(`Generated ${generated} medium variants`)
