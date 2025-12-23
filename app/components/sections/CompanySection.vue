<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

const services = [
  { key: 'web', icon: 'i-heroicons-globe-alt' },
  { key: 'consulting', icon: 'i-heroicons-light-bulb' },
  { key: 'architecture', icon: 'i-heroicons-cube-transparent' }
]
</script>

<template>
  <section
    id="company"
    class="section-padding"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Main Card -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
          class="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <!-- Background Accent -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl" />

          <div class="relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <!-- Logo Side -->
              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.8 }"
                :visible-once="{ opacity: 1, scale: 1, transition: { type: 'spring', delay: 200 } }"
                class="shrink-0"
              >
                <a
                  href="https://fh-softdev.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block hover:scale-105 transition-transform duration-300"
                >
                  <img
                    :src="colorMode.value === 'dark' ? '/img/Imagotype_WhiteFH.png' : '/img/Imagotype_BlackFH.png'"
                    alt="FH SoftDev"
                    class="h-20 md:h-24 w-auto"
                  >
                </a>
              </div>

              <!-- Content Side -->
              <div class="flex-1 text-center lg:text-left">
                <p
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 300 } }"
                  class="text-orange-400 text-sm font-medium mb-2"
                >
                  {{ t('company.label') }}
                </p>
                <h2
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 400 } }"
                  class="text-2xl md:text-3xl font-bold mb-4"
                >
                  <span class="gradient-text">{{ t('company.title') }}</span>
                </h2>
                <p
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 500 } }"
                  class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6"
                >
                  {{ t('company.description') }}
                </p>

                <!-- Services -->
                <div
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 600 } }"
                  class="flex flex-wrap justify-center lg:justify-start gap-3 mb-6"
                >
                  <div
                    v-for="service in services"
                    :key="service.key"
                    class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-sm"
                  >
                    <UIcon :name="service.icon" class="w-4 h-4 text-orange-400" />
                    <span class="text-zinc-600 dark:text-zinc-300">{{ t(`company.services.${service.key}`) }}</span>
                  </div>
                </div>

                <!-- CTA -->
                <a
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 700 } }"
                  href="https://fh-softdev.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group"
                >
                  <span>{{ t('company.cta') }}</span>
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
