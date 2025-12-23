<script setup lang="ts">
const { t } = useI18n()

const facts = [
  { key: 'experience', value: '8+', icon: 'i-heroicons-clock' },
  { key: 'projects', value: '50+', icon: 'i-heroicons-rocket-launch' },
  { key: 'opensource', value: '4', icon: 'i-heroicons-code-bracket' }
]

</script>

<template>
  <section
    id="about"
    class="section-padding"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">{{ t('about.title') }}</span>
          </h2>
          <p class="text-xl text-zinc-400">{{ t('about.intro') }}</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Profile Image -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 700, delay: 200 } }"
          >
            <div class="relative">
              <!-- Profile Image -->
              <div
                v-motion
                :hovered="{ scale: 1.02, rotate: 1, transition: { duration: 300 } }"
                class="relative aspect-square max-w-sm mx-auto"
              >
                <!-- Glow effect behind image -->
                <div class="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/40 to-amber-500/40 blur-3xl" />
                <!-- Image container -->
                <div class="relative rounded-full overflow-hidden border-4 border-orange-500/20 shadow-2xl shadow-orange-500/20">
                  <img
                    src="/img/profile.jpeg"
                    alt="Florian Heuberger"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <!-- Decorative rectangles -->
              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.5, rotate: -10 }"
                :visible-once="{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', delay: 500 } }"
                class="absolute -top-4 -right-4 w-24 h-24 border-2 border-orange-500/30 rounded-2xl"
              />
              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.5, rotate: 10 }"
                :visible-once="{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', delay: 600 } }"
                class="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-amber-500/30 rounded-2xl"
              />
            </div>
          </div>

          <!-- Content -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
          >
            <p class="text-lg text-zinc-300 leading-relaxed mb-8">
              {{ t('about.description') }}
            </p>

            <!-- Facts -->
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(fact, index) in facts"
                :key="fact.key"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: 500 + index * 100 } }"
                :hovered="{ y: -5, transition: { duration: 200 } }"
                class="glass rounded-xl p-4 text-center"
              >
                <UIcon :name="fact.icon" class="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div class="text-3xl font-bold gradient-text mb-1">
                  {{ fact.value }}
                </div>
                <div class="text-xs text-zinc-500">
                  {{ t(`about.facts.${fact.key}`) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
