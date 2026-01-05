<script setup lang="ts">
const { t, locale } = useI18n()

const emit = defineEmits<{
  toggleLocale: []
}>()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed(() => [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'uses', href: '#uses' },
  { key: 'hardware', href: '#hardware' },
  { key: 'contact', href: '#contact' }
])

onMounted(() => {
  handleScroll() // Check initial scroll position
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (href: string) => {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass py-3' : 'py-5'"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#"
        class="text-xl font-bold gradient-text"
        @click.prevent="scrollTo('#hero')"
      >
        FH
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-orange-400 transition-colors duration-200"
          @click.prevent="scrollTo(item.href)"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Language Toggle -->
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          :padded="false"
          class="w-9 h-9"
          @click="emit('toggleLocale')"
        >
          <ClientOnly>
            <UIcon
              :name="locale === 'de' ? 'i-circle-flags-uk' : 'i-circle-flags-de'"
              class="w-5 h-5"
            />
            <template #fallback>
              <UIcon
                name="i-heroicons-language"
                class="w-5 h-5"
              />
            </template>
          </ClientOnly>
        </UButton>

        <!-- Color Mode Toggle -->
        <UColorModeButton variant="ghost" color="neutral" size="sm" class="w-9 h-9" />

        <!-- Mobile Menu Toggle -->
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          :padded="false"
          class="w-9 h-9 md:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <UIcon
            :name="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="w-5 h-5"
          />
        </UButton>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMobileMenuOpen"
        class="md:hidden glass mt-2 mx-4 rounded-xl p-4"
      >
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="block py-3 text-zinc-600 dark:text-zinc-400 hover:text-orange-400 transition-colors"
          @click.prevent="scrollTo(item.href)"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>
    </Transition>
  </header>
</template>
