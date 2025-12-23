<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(i => typeof i === 'object' && i.code !== locale.value)
)

const toggleLocale = () => {
  const next = availableLocales.value[0]
  if (next && typeof next === 'object') {
    setLocale(next.code)
  }
}
</script>

<template>
  <div class="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
    <!-- Background Effects (Client Only to avoid hydration mismatch) -->
    <ClientOnly>
      <div class="fixed inset-0 gradient-bg pointer-events-none" />

      <!-- Floating Orbs -->
      <div class="bg-orbs">
        <div class="orb orb-1" />
        <div class="orb orb-2" />
        <div class="orb orb-3" />
        <div class="orb orb-4" />
        <div class="orb orb-5" />
      </div>

      <!-- Kometen (verschiedene Richtungen) -->
      <div class="shooting-stars">
        <div class="shooting-star comet-1" />
        <div class="shooting-star comet-2" />
        <div class="shooting-star comet-3" />
        <div class="shooting-star comet-4" />
        <div class="shooting-star comet-5" />
        <div class="shooting-star comet-6" />
        <div class="shooting-star comet-7" />
      </div>

      <!-- Milchstraßen-Nebel (selten) -->
      <div class="nebula-container">
        <div class="nebula nebula-1" />
        <div class="nebula nebula-2" />
      </div>

      <!-- Twinkling Stars (Dark Mode) -->
      <div class="stars-bg">
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
        <div class="star-dot" />
      </div>

      <!-- Light Mode Effects: Aurora + Bubbles -->
      <div class="light-bg-effects">
        <div class="aurora aurora-1" />
        <div class="aurora aurora-2" />
        <div class="aurora aurora-3" />
        <div class="bubble bubble-1" />
        <div class="bubble bubble-2" />
        <div class="bubble bubble-3" />
        <div class="bubble bubble-4" />
        <div class="bubble bubble-5" />
        <div class="bubble bubble-6" />
        <div class="bubble bubble-7" />
      </div>

      <!-- Floating Tech Icons (Vue/Nuxt) -->
      <div class="tech-icons-bg">
        <UIcon name="i-simple-icons-vuedotjs" class="tech-icon tech-icon-1" />
        <UIcon name="i-simple-icons-nuxtdotjs" class="tech-icon tech-icon-2" />
        <UIcon name="i-simple-icons-vuedotjs" class="tech-icon tech-icon-3" />
        <UIcon name="i-simple-icons-nuxtdotjs" class="tech-icon tech-icon-4" />
        <UIcon name="i-simple-icons-vuedotjs" class="tech-icon tech-icon-5" />
      </div>
    </ClientOnly>

    <!-- Header -->
    <LayoutAppHeader
      @toggle-locale="toggleLocale"
    />

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <LayoutAppFooter />

    <!-- Cookie Banner -->
    <CookieBanner />
  </div>
</template>
