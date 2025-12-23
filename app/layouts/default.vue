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
    <!-- Background gradient -->
    <div class="fixed inset-0 gradient-bg pointer-events-none" />

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
  </div>
</template>
