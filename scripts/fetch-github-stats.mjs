// Snapshot the GitHub stat SVGs into public/github/ at build time.
//
// Why: the live third-party services (github-readme-stats, streak-stats) send no
// Cross-Origin-Resource-Policy header, so the site's COEP:require-corp blocks them
// in the browser; they're also rate-limited. Serving same-origin snapshots fixes
// both — the cards render instantly and never depend on a live request.
//
// Resilient by design: if a service is down/rate-limited at build time, we keep the
// previously committed snapshot (or skip) instead of failing the build or writing
// an error SVG.
import { writeFile, mkdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'github')

const USER = 'Patel230'
const SOURCES = [
  {
    file: 'stats.svg',
    url: `https://github-readme-stats-sigma-five.vercel.app/api?username=${USER}&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=ffd700&text_color=e5e5e5&icon_color=ffd700&count_private=true`
  },
  {
    file: 'streak.svg',
    url: `https://streak-stats.demolab.com/?user=${USER}&theme=dark&hide_border=true&background=00000000&ring=ffd700&fire=f97316&currStreakLabel=ffd700&sideLabels=b3b3b3`
  },
  {
    file: 'top-langs.svg',
    url: `https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${USER}&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=8b5cf6&text_color=e5e5e5&langs_count=6`
  }
]

// A response is only "good" if it's an SVG that isn't the service's error card.
function isValidSvg(text) {
  if (!text || !text.includes('<svg')) return false
  const lower = text.toLowerCase()
  const errorMarkers = [
    'something went wrong',
    'maximum retries',
    'rate limit',
    'api rate limit exceeded',
    'could not fetch',
    'not found'
  ]
  return !errorMarkers.some(m => lower.includes(m))
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function fetchWithTimeout(url, ms = 15000) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: 'image/svg+xml' } })
  } finally {
    clearTimeout(t)
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  let ok = 0
  let kept = 0

  for (const { file, url } of SOURCES) {
    const dest = join(OUT_DIR, file)
    try {
      const res = await fetchWithTimeout(url)
      const text = res.ok ? await res.text() : ''
      if (res.ok && isValidSvg(text)) {
        await writeFile(dest, text, 'utf8')
        ok++
        console.log(`  ✓ ${file} (${text.length} bytes)`)
      } else if (await exists(dest)) {
        kept++
        console.log(
          `  ~ ${file}: service returned ${res.status || 'invalid SVG'} — kept existing snapshot`
        )
      } else {
        console.log(
          `  ✖ ${file}: service unavailable and no existing snapshot — card will fall back`
        )
      }
    } catch (err) {
      if (await exists(dest)) {
        kept++
        console.log(`  ~ ${file}: fetch failed (${err.message}) — kept existing snapshot`)
      } else {
        console.log(`  ✖ ${file}: fetch failed (${err.message}) — no snapshot available`)
      }
    }
  }

  console.log(`GitHub stats snapshot: ${ok} fetched, ${kept} kept. Output: public/github/`)
}

main()
