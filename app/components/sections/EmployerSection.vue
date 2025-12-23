<script setup lang="ts">
const { t } = useI18n()

const roles = [
  { key: 'leader', icon: 'i-heroicons-user-group' },
  { key: 'trainer', icon: 'i-heroicons-academic-cap' }
]
</script>

<template>
  <section
    id="employer"
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
          <div class="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-sky-500/10 to-transparent rounded-full blur-3xl" />
          <div class="absolute bottom-0 right-0 w-48 h-48 bg-linear-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />

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
                  href="https://dadg.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block hover:scale-105 transition-transform duration-300"
                >
                  <div class="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white flex items-center justify-center shadow-lg p-3">
                    <img
                      src="/img/dadg.webp"
                      alt="DADG"
                      class="w-full h-full object-contain"
                    >
                  </div>
                </a>
              </div>

              <!-- Content Side -->
              <div class="flex-1 text-center lg:text-left">
                <p
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 300 } }"
                  class="text-sky-400 text-sm font-medium mb-2"
                >
                  {{ t('employer.label') }}
                </p>
                <h2
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 400 } }"
                  class="text-2xl md:text-3xl font-bold mb-2"
                >
                  <span class="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">{{ t('employer.title') }}</span>
                </h2>
                <p
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 450 } }"
                  class="text-sm text-zinc-600 dark:text-zinc-500 mb-3"
                >
                  {{ t('employer.fullName') }}
                </p>
                <p
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 500 } }"
                  class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6"
                >
                  {{ t('employer.description') }}
                </p>

                <!-- Roles -->
                <div
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 600 } }"
                  class="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
                >
                  <div
                    v-for="role in roles"
                    :key="role.key"
                    class="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50"
                  >
                    <div class="w-10 h-10 rounded-lg bg-linear-to-br from-sky-500/20 to-blue-500/20 flex items-center justify-center">
                      <UIcon :name="role.icon" class="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{{ t(`employer.roles.${role.key}`) }}</div>
                      <div class="text-xs text-zinc-500 dark:text-zinc-400">{{ t(`employer.roles.${role.key}Desc`) }}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <a
                  v-motion
                  :initial="{ opacity: 0 }"
                  :visible-once="{ opacity: 1, transition: { delay: 700 } }"
                  href="https://dadg.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors group"
                >
                  <span>{{ t('employer.cta') }}</span>
                  <UIcon
                    name="i-heroicons-arrow-top-right-on-square"
                    class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
