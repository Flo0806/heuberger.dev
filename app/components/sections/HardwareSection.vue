<script setup lang="ts">
const { t } = useI18n()

const hardware = {
  servers: [
    { name: 'DELL PowerEdge R730', specs: 'Homelab Server', icon: 'i-heroicons-server' },
    { name: 'DELL PowerEdge R440', specs: 'Homelab Server', icon: 'i-heroicons-server' }
  ],
  workstation: [
    { name: 'Intel Core i5-13400', specs: '16 Threads', icon: 'i-heroicons-cpu-chip' },
    { name: '64GB DDR5 RAM', specs: 'System Memory', icon: 'i-heroicons-circle-stack' },
    { name: 'MEDION Erazer', specs: 'Desktop PC', icon: 'i-heroicons-computer-desktop' },
    { name: 'Ubuntu 26.04', specs: 'Operating System', icon: 'i-heroicons-heart' },

  ],
  displays: [
    { name: 'Samsung Odyssey G9', specs: '49" Ultrawide', icon: 'i-heroicons-tv' },
    { name: 'Lenovo 4K', specs: 'Secondary Display', icon: 'i-heroicons-tv' }
  ],
  peripherals: [
    { name: 'Keychron Q1 QMK', specs: 'Mechanical Keyboard', icon: 'i-heroicons-command-line' },
    { name: 'Logitech MX Master 3S', specs: 'Mouse', icon: 'i-heroicons-cursor-arrow-rays' },
    { name: 'Logitech C922', specs: 'HD Webcam', icon: 'i-heroicons-video-camera' },
    { name: 'Logitech Astro A50 5th Gen', specs: 'Wireless Headset', icon: 'i-heroicons-speaker-wave' }
  ],
  mobile: [
    { name: 'MacBook Pro M1', specs: 'Apple Silicon', icon: 'i-simple-icons-apple' },
    { name: 'Lenovo Yoga Slim 7', specs: 'Windows Laptop', icon: 'i-simple-icons-lenovo' }
  ]
}

const categories = ['servers', 'workstation', 'displays', 'peripherals', 'mobile'] as const
</script>

<template>
  <section
    id="hardware"
    class="section-padding"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">{{ t('hardware.title') }}</span>
          </h2>
          <p class="text-xl text-zinc-600 dark:text-zinc-400">{{ t('hardware.subtitle') }}</p>
        </div>

        <!-- Hardware Categories -->
        <div class="space-y-8">
          <div
            v-for="category in categories"
            :key="category"
          >
            <h3 class="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-orange-500" />
              {{ t(`hardware.categories.${category}`) }}
            </h3>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="item in hardware[category]"
                :key="item.name"
                class="glass rounded-xl p-4 flex items-center gap-4 hover:border-orange-500/50 transition-colors duration-300"
              >
                <div class="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center shrink-0">
                  <UIcon :name="item.icon" class="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <div class="font-medium text-zinc-800 dark:text-zinc-200">{{ item.name }}</div>
                  <div class="text-sm text-zinc-600 dark:text-zinc-500">{{ item.specs }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
