<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(i => typeof i === 'object' && i.code !== locale.value)
)

useSectionAmbient()
useCardReveal()

// Without JS nothing ever adds .card-in, so undo the hidden state.
useHead({
  noscript: [{ children: 'main section .glass{opacity:1;transform:none}' }]
})

const toggleLocale = () => {
  const next = availableLocales.value[0]
  if (next && typeof next === 'object') {
    setLocale(next.code)
  }
}
</script>

<template>
  <div class="">
    <LiquidGlassFilter />

    <!-- Backdrop the glass panels refract; stays behind the z-10 main. -->
    <div
      class="ambient"
      aria-hidden="true"
    />

    <CodeGhost />

    <!-- Header -->
    <LayoutAppHeader
      @toggle-locale="toggleLocale"
    />

    <!-- Main content -->
    <main class="relative z-10">
      <slot />
    </main>

    <!-- Footer -->
    <LayoutAppFooter />

    <!-- Cookie Banner -->
    <CookieBanner />
  </div>
</template>
