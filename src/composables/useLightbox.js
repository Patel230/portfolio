import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from './useFocusTrap.js'

export function useLightbox(projectList) {
  const lightboxOpen = ref(false)
  const currentProjectIndex = ref(0)
  const carouselIndex = ref(0)
  const thumbnailStripRef = ref(null)
  const thumbnailRefs = ref([])
  const lightboxRef = ref(null)

  const { activate: trapFocus, deactivate: releaseFocus } = useFocusTrap()

  // Resolve list — accept ref or plain array
  const resolveList = () =>
    typeof projectList === 'function' ? projectList() : (projectList?.value ?? projectList)

  const currentProject = computed(() => resolveList()[currentProjectIndex.value])

  const setThumbnailRef = (el, index) => {
    if (el) thumbnailRefs.value[index] = el
  }

  const scrollThumbnailIntoView = index => {
    const thumbnail = thumbnailRefs.value[index]
    if (thumbnail && thumbnailStripRef.value) {
      const stripRect = thumbnailStripRef.value.getBoundingClientRect()
      const thumbRect = thumbnail.getBoundingClientRect()
      const thumbCenter = thumbRect.left + thumbRect.width / 2
      const stripCenter = stripRect.left + stripRect.width / 2
      thumbnailStripRef.value.scrollBy({ left: thumbCenter - stripCenter, behavior: 'smooth' })
    }
  }

  const selectThumbnail = index => {
    carouselIndex.value = index
    scrollThumbnailIntoView(index)
  }

  let _triggerEl = null

  const openLightbox = (project, triggerEl) => {
    const list = resolveList()
    currentProjectIndex.value = list.findIndex(p => p.id === project.id)
    carouselIndex.value = 0
    lightboxOpen.value = true
    thumbnailRefs.value = []
    document.body.style.overflow = 'hidden'
    _triggerEl = triggerEl || null
    // Focus trap activated after DOM updates (next tick via setTimeout)
    setTimeout(() => {
      if (lightboxRef.value) trapFocus(lightboxRef.value, _triggerEl)
    }, 60)
  }

  const closeLightbox = () => {
    lightboxOpen.value = false
    document.body.style.overflow = ''
    releaseFocus()
  }

  const navigateCarousel = direction => {
    if (!currentProject.value) return
    const newIndex = carouselIndex.value + direction
    if (newIndex >= 0 && newIndex < currentProject.value.images.length) {
      carouselIndex.value = newIndex
      scrollThumbnailIntoView(newIndex)
    }
  }

  const handleImageError = e => {
    e.target.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%231e293b" width="800" height="500"/%3E%3Ctext fill="%2364748b" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage Coming Soon%3C/text%3E%3C/svg%3E'
  }

  const handleKeydown = e => {
    if (!lightboxOpen.value) return
    if (e.key === 'ArrowLeft') navigateCarousel(-1)
    if (e.key === 'ArrowRight') navigateCarousel(1)
    if (e.key === 'Escape') closeLightbox()
  }

  watch(carouselIndex, () => scrollThumbnailIntoView(carouselIndex.value))

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })

  return {
    lightboxOpen,
    lightboxRef,
    currentProject,
    carouselIndex,
    thumbnailStripRef,
    thumbnailRefs,
    setThumbnailRef,
    selectThumbnail,
    openLightbox,
    closeLightbox,
    navigateCarousel,
    handleImageError
  }
}
