/**
 * Whether the user has requested reduced motion. Checked at call time so a
 * live OS-setting change is respected without a reload.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Scroll behavior that honors the user's reduced-motion preference. */
export function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}
