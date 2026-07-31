<script setup lang="ts">
const { t } = useI18n();

defineEmits<{
  scrollTo: [href: string];
}>();
</script>

<template>
  <!-- Bottom padding is deliberately larger than the top: the block is
       vertically centred, so the heavier bottom shifts the whole thing up and
       the greeting sits higher without moving anything by hand. -->
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center pt-24 pb-36 md:pt-28 md:pb-40"
  >
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Greeting -->
        <p class="text-orange-400 text-lg md:text-xl mb-4">
          {{ t('hero.greeting') }}
        </p>

        <!-- Name -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          <span class="gradient-text">{{ t('hero.name') }}</span>
        </h1>

        <!-- Title -->
        <h2
          class="text-2xl md:text-3xl lg:text-4xl text-zinc-700 dark:text-zinc-300 font-light mb-6"
        >
          {{ t('hero.title') }}
        </h2>

        <!-- Nuxt Ecosystem Badge -->
        <div class="nuxt-badge-wrapper mb-8">
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
        <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
          {{ t('hero.description') }}
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
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
        <div>
          <GitHubStats />
        </div>

        <!-- Sits inside the hero so it lands above the fold on a desktop
             viewport. On short screens the hero simply grows past 100vh,
             which beats rendering the strip twice and hiding one copy. -->
        <SectionsCreatorSection />
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <UIcon name="i-heroicons-chevron-down" class="w-6 h-6 text-zinc-600 dark:text-zinc-500" />
    </div>
  </section>
</template>
