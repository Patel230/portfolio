<template>
  <a
    href="#main-content"
    class="skip-to-content"
  >Skip to main content</a>
  <div id="app">
    <NavBar />
    <main id="main-content">
      <ErrorBoundary>
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <transition
                  name="fade"
                  mode="out-in"
                >
                  <component
                    :is="Component"
                    :key="$route.path"
                  />
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
import { NavBar } from './layout'
import { FooterSection } from './sections'
import LoadingSpinner from './components/ui/LoadingSpinner.vue'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'
import ScrollToTop from './components/ui/ScrollToTop.vue'
import UpdatePrompt from './components/ui/UpdatePrompt.vue'
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
