<script setup lang="ts">
const { t } = useI18n()

defineEmits<{
  scrollTo: [href: string]
}>()
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center section-padding pt-32"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.5 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1500 } }"
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float"
      />
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.5 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1500, delay: 300 } }"
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float"
        style="animation-delay: 1s;"
      />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Greeting -->
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="text-orange-400 text-lg md:text-xl mb-4 opacity-0"
        >
          {{ t('hero.greeting') }}
        </p>

        <!-- Name -->
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          class="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 opacity-0"
        >
          <span class="gradient-text">{{ t('hero.name') }}</span>
        </h1>

        <!-- Title -->
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 600 } }"
          class="text-2xl md:text-3xl lg:text-4xl text-zinc-700 dark:text-zinc-300 font-light mb-6 opacity-0"
        >
          {{ t('hero.title') }}
        </h2>

        <!-- Nuxt Ecosystem Badge -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, delay: 800 } }"
          class="nuxt-badge-wrapper mb-8 opacity-0"
        >
          <div class="nuxt-badge">
            <div class="nuxt-badge-glow" />
            <div class="nuxt-badge-content">
              <UIcon name="i-simple-icons-nuxtdotjs" class="w-6 h-6 text-[#00DC82]" />
              <span class="text-base text-zinc-800 dark:text-white">
                Nuxt Ecosystem <span class="font-bold text-[#00DC82]">Member</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 900 } }"
          class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 opacity-0"
        >
          {{ t('hero.description') }}
        </p>

        <!-- CTAs -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1100 } }"
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0"
        >
          <UButton
            size="lg"
            color="primary"
            class="animate-pulse-glow hover:scale-105 active:scale-95 transition-transform"
            @click="$emit('scrollTo', '#projects')"
          >
            {{ t('hero.cta.projects') }}
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            color="neutral"
            class="hover:scale-105 active:scale-95 transition-transform"
            @click="$emit('scrollTo', '#contact')"
          >
            {{ t('hero.cta.contact') }}
          </UButton>
        </div>

        <!-- GitHub Stats -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1300 } }"
          class="opacity-0"
        >
          <GitHubStats />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 1500 } }"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
    >
      <UIcon name="i-heroicons-chevron-down" class="w-6 h-6 text-zinc-600 dark:text-zinc-500" />
    </div>
  </section>
</template>
