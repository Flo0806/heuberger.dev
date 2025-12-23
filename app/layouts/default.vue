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

      <!-- Shooting Stars -->
      <div class="shooting-stars">
        <div class="shooting-star star-1" />
        <div class="shooting-star star-2" />
        <div class="shooting-star star-3" />
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
