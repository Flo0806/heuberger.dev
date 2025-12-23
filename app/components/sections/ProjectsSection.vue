<script setup lang="ts">
const { t } = useI18n()

// Fetch GitHub stars for vorm repo
const { data: githubData } = await useFetch<{ stargazers_count: number }>(
  'https://api.github.com/repos/Flo0806/vorm',
  { key: 'github-vorm', server: false, default: () => ({ stargazers_count: 0 }) }
)

// Fetch NPM downloads
const { data: npmVueData } = await useFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/vorm-vue',
  { key: 'npm-vorm-vue', server: false, default: () => ({ downloads: 0 }) }
)
const { data: npmNuxtData } = await useFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/vorm-nuxt',
  { key: 'npm-vorm-nuxt', server: false, default: () => ({ downloads: 0 }) }
)

const formatNumber = (num: number) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

const projects = computed(() => [
  {
    key: 'dmHero',
    icon: null,
    customIcon: '/img/dm-hero-logo-transparent.png',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    link: 'https://dm-hero.com',
    linkType: 'website',
    github: 'https://github.com/Flo0806/dm-hero',
    stars: null,
    downloads: null,
    featured: true
  },
  {
    key: 'vormVue',
    icon: 'i-simple-icons-vuedotjs',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    link: 'https://www.npmjs.com/package/vorm-vue',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/vorm',
    stars: githubData.value?.stargazers_count || 0,
    downloads: npmVueData.value?.downloads || 0
  },
  {
    key: 'vormNuxt',
    icon: 'i-simple-icons-nuxtdotjs',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    link: 'https://www.npmjs.com/package/vorm-nuxt',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/vorm',
    stars: githubData.value?.stargazers_count || 0,
    downloads: npmNuxtData.value?.downloads || 0
  },
  {
    key: 'lintmon',
    icon: 'i-simple-icons-visualstudiocode',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    link: 'https://marketplace.visualstudio.com/items?itemName=FHSoftDev.lintmon',
    linkType: 'vscode',
    stars: null,
    downloads: null
  }
])
</script>

<template>
  <section
    id="projects"
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
            <span class="gradient-text">{{ t('projects.title') }}</span>
          </h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">{{ t('projects.subtitle') }}</p>
        </div>

        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, index) in projects"
            :key="project.key"
            v-motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 500,
                delay: index * 150
              }
            }"
            :hovered="{ scale: 1.03, transition: { duration: 200 } }"
            class="group glass rounded-2xl p-6 hover:border-orange-500/50 transition-colors duration-300 flex flex-col"
          >
            <!-- Icon -->
            <div class="mb-4">
              <div
                :class="[project.bgColor, 'w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300']"
              >
                <img
                  v-if="project.customIcon"
                  :src="project.customIcon"
                  :alt="t(`projects.items.${project.key}.name`)"
                  class="w-10 h-10 object-contain"
                />
                <UIcon v-else :name="project.icon" :class="[project.color, 'w-8 h-8']" />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 flex flex-col">
              <h3 class="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {{ t(`projects.items.${project.key}.name`) }}
              </h3>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
                {{ t(`projects.items.${project.key}.description`) }}
              </p>

              <!-- Stats Badges - always show container for consistent height -->
              <div class="mt-auto pt-4 border-t border-zinc-800/30 min-h-[44px] flex items-center">
                <div v-if="project.stars !== null" class="flex items-center gap-2">
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-400" />
                    <span class="text-xs font-medium text-yellow-400">{{ formatNumber(project.stars) }}</span>
                  </div>
                  <div v-if="project.downloads > 0" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5 text-green-400" />
                    <span class="text-xs font-medium text-green-400">{{ formatNumber(project.downloads) }}</span>
                  </div>
                </div>
                <div v-else-if="project.featured" class="flex items-center gap-2">
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                    <UIcon name="i-heroicons-fire" class="w-3.5 h-3.5 text-orange-400" />
                    <span class="text-xs font-medium text-orange-400">Desktop App</span>
                  </div>
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <UIcon name="i-simple-icons-electron" class="w-3.5 h-3.5 text-purple-400" />
                    <span class="text-xs font-medium text-purple-400">Electron</span>
                  </div>
                </div>
                <div v-else class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <UIcon name="i-simple-icons-visualstudiocode" class="w-3.5 h-3.5 text-blue-400" />
                  <span class="text-xs font-medium text-blue-400">VS Code Extension</span>
                </div>
              </div>
            </div>

            <!-- Links -->
            <div class="flex items-center gap-3 mt-5 pt-5 border-t border-zinc-800/50">
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                <UIcon
                  :name="project.linkType === 'npm' ? 'i-simple-icons-npm' : project.linkType === 'website' ? 'i-heroicons-globe-alt' : 'i-simple-icons-visualstudiocode'"
                  class="w-4 h-4"
                />
                <span>{{ project.linkType === 'npm' ? 'NPM' : project.linkType === 'website' ? 'Website' : 'Marketplace' }}</span>
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-auto text-zinc-600 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
                aria-label="GitHub"
              >
                <UIcon name="i-simple-icons-github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
