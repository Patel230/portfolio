<template>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  <div id="app">
    <NavBar />
    <main id="main-content">
      <ErrorBoundary>
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <transition name="fade" mode="out-in">
                  <component :is="Component" :key="$route.path" />
                </transition>
              </template>
              <template #fallback>
                <LoadingSpinner />
              </template>
            </Suspense>
          </template>
        </router-view>
      </ErrorBoundary>
    </main>
    <FooterSection />
    <ScrollToTop />
    <UpdatePrompt />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import UpdatePrompt from './components/UpdatePrompt.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
