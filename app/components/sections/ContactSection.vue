<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()

const socials = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: appConfig.site.socials.github },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: appConfig.site.socials.linkedin },
  { name: 'Discord', icon: 'i-simple-icons-discord', url: 'https://discord.com/users/loewnzaan', username: '@loewnzaan' }
]
</script>

<template>
  <section
    id="contact"
    class="section-padding"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="mb-12"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">{{ t('contact.title') }}</span>
          </h2>
          <p class="text-xl text-zinc-400 mb-2">{{ t('contact.subtitle') }}</p>
          <p class="text-zinc-500">{{ t('contact.description') }}</p>
        </div>

        <!-- Email Button -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, delay: 200 } }"
          class="mb-12"
        >
          <a
            :href="`mailto:${appConfig.site.email}`"
            class="inline-block"
          >
            <UButton
              size="xl"
              color="primary"
              class="animate-pulse-glow hover:scale-105 active:scale-95 transition-transform"
            >
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-2" />
              {{ t('contact.email') }}
            </UButton>
          </a>
        </div>

        <!-- Social Links -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible-once="{ opacity: 1, transition: { duration: 400, delay: 400 } }"
        >
          <p class="text-sm text-zinc-500 mb-4">{{ t('contact.socials') }}</p>
          <div class="flex items-center justify-center gap-4">
            <a
              v-for="(social, index) in socials"
              :key="social.name"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, delay: 500 + index * 100 } }"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group glass w-14 h-14 rounded-xl flex items-center justify-center hover:border-orange-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-200"
              :aria-label="social.name"
            >
              <UIcon
                :name="social.icon"
                class="w-6 h-6 text-zinc-400 group-hover:text-orange-400 transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
