const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ')

export function useFocusTrap() {
  let containerEl = null
  let returnEl = null

  const handleKeydown = e => {
    if (e.key !== 'Tab' || !containerEl) return
    const focusable = Array.from(containerEl.querySelectorAll(FOCUSABLE))
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const activate = (container, returnTarget) => {
    containerEl = container
    returnEl = returnTarget || null
    document.addEventListener('keydown', handleKeydown)
    // Move focus to first focusable element inside container
    const focusable = container ? container.querySelectorAll(FOCUSABLE) : []
    if (focusable.length) {
      setTimeout(() => focusable[0].focus(), 50)
    }
  }

  const deactivate = () => {
    document.removeEventListener('keydown', handleKeydown)
    containerEl = null
    if (returnEl) {
      returnEl.focus()
      returnEl = null
    }
  }

  return { activate, deactivate }
}
