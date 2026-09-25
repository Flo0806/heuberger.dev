<script setup lang="ts">
const { t } = useI18n()

// Stars come from our own cached endpoint, never from api.github.com — see
// useGithubStats(). Not awaited: the payload is already resolved during SSR,
// so there is nothing to block setup for.
const { data: githubStats } = useGithubStats()

const starsOf = (fullName: string) =>
  githubStats.value?.repos.find(repo => repo.fullName === fullName)?.stars ?? 0

// NPM downloads. Lazy and unawaited: these are decoration, and awaiting them
// in setup made the eleven requests run one after another and held up the
// whole page until the last one landed. Now they all fly at once and fill in.
const npmVueData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/vorm-vue',
  { key: 'npm-vorm-vue', server: false, default: () => ({ downloads: 0 }) }
).data
const npmNuxtData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/vorm-nuxt',
  { key: 'npm-vorm-nuxt', server: false, default: () => ({ downloads: 0 }) }
).data
const npmJanoData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/@jano-editor/editor',
  { key: 'npm-jano', server: false, default: () => ({ downloads: 0 }) }
).data
const npmFreeformData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/nuxt-freeform',
  { key: 'npm-freeform', server: false, default: () => ({ downloads: 0 }) }
).data
const npmSpyglassData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/nuxt-spyglass',
  { key: 'npm-spyglass', server: false, default: () => ({ downloads: 0 }) }
).data
const npmPigeonData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/nuxt-pigeon',
  { key: 'npm-pigeon', server: false, default: () => ({ downloads: 0 }) }
).data
// The monorepo publishes five scoped packages; @jasy/pdf is the flagship and
// stands in for the project's reach on the card.
const npmJasyData = useLazyFetch<{ downloads: number }>(
  'https://api.npmjs.org/downloads/point/last-month/@jasy/pdf',
  { key: 'npm-jasy-pdf', server: false, default: () => ({ downloads: 0 }) }
).data

const formatNumber = (num: number) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

const projects = computed(() => [
  {
    key: 'jano',
    icon: null,
    customIcon: '/img/jano-logo.png',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    link: 'https://janoeditor.dev',
    linkType: 'website',
    github: 'https://github.com/jano-editor/jano',
    stars: starsOf('jano-editor/jano'),
    downloads: npmJanoData.value?.downloads || 0,
    badges: [
      { label: 'Terminal Editor', icon: 'i-heroicons-command-line', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
      { label: 'Node.js', icon: 'i-simple-icons-nodedotjs', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
    ]
  },
  {
    key: 'dmHero',
    icon: null,
    customIcon: '/img/dm-hero-logo-transparent.png',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    link: 'https://dm-hero.com',
    linkType: 'website',
    github: 'https://github.com/Flo0806/dm-hero',
    stars: starsOf('Flo0806/dm-hero'),
    downloads: null,
    badges: [
      { label: 'Desktop App', icon: 'i-heroicons-fire', bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
      { label: 'Electron', icon: 'i-simple-icons-electron', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
      { label: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    ]
  },
  {
    key: 'jasy',
    icon: 'i-heroicons-document-text',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    link: 'https://jasy.dev',
    linkType: 'website',
    github: 'https://github.com/jasy-pdf/jasy',
    stars: starsOf('jasy-pdf/jasy'),
    downloads: npmJasyData.value?.downloads || 0,
    badges: [
      { label: 'ZUGFeRD / XRechnung', icon: 'i-heroicons-document-check', bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
      { label: 'CLI', icon: 'i-heroicons-command-line', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' },
      { label: 'TypeScript', icon: 'i-simple-icons-typescript', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    ]
  },
    {
    key: 'nuxtPigeon',
    icon: 'i-heroicons-paper-airplane',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    link: 'https://npmx.dev/package/nuxt-pigeon',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/nuxt-pigeon',
    stars: starsOf('Flo0806/nuxt-pigeon'),
    downloads: npmPigeonData.value?.downloads || 0,
    badges: [
      { label: 'Nuxt Module', icon: 'i-simple-icons-nuxtdotjs', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
      { label: 'Messaging', icon: 'i-heroicons-chat-bubble-left-right', bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400' },
      { label: 'Webhooks', icon: 'i-heroicons-bolt', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' },
    ]
  },
  {
    key: 'nuxtFreeform',
    icon: null,
    customIcon: '/img/nuxt-freeform-logo.png',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    link: 'https://npmx.dev/package/nuxt-freeform',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/nuxt-freeform',
    stars: starsOf('Flo0806/nuxt-freeform'),
    downloads: npmFreeformData.value?.downloads || 0,
    badges: []
  },
  {
    key: 'nuxtSpyglass',
    icon: 'i-heroicons-magnifying-glass',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    link: 'https://npmx.dev/package/nuxt-spyglass',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/nuxt-spyglass',
    stars: starsOf('Flo0806/nuxt-spyglass'),
    downloads: npmSpyglassData.value?.downloads || 0,
    badges: [
      { label: 'Nuxt Module', icon: 'i-simple-icons-nuxtdotjs', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
      { label: 'MCP', icon: 'i-heroicons-cpu-chip', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
      { label: 'DevTools', icon: 'i-heroicons-wrench-screwdriver', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' },
    ]
  },
  {
    key: 'vormVue',
    icon: 'i-simple-icons-vuedotjs',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    link: 'https://npmx.dev/package/vorm-vue',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/vorm',
    stars: starsOf('Flo0806/vorm'),
    downloads: npmVueData.value?.downloads || 0,
    badges: []
  },
  {
    key: 'vormNuxt',
    icon: 'i-simple-icons-nuxtdotjs',
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    link: 'https://npmx.dev/package/vorm-nuxt',
    linkType: 'npm',
    github: 'https://github.com/Flo0806/vorm',
    stars: starsOf('Flo0806/vorm'),
    downloads: npmNuxtData.value?.downloads || 0,
    badges: []
  },
  {
    key: 'nuxtCare',
    icon: null,
    customIcon: '/img/nuxt.care-logo.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    link: 'https://nuxt.care',
    linkType: 'website',
    github: 'https://github.com/Flo0806/nuxt.care',
    stars: starsOf('Flo0806/nuxt.care'),
    downloads: null,
    badges: [
      { label: 'Web App', icon: 'i-heroicons-globe-alt', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
      { label: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    ]
  },
    {
    key: 'floCode',
    icon: 'i-heroicons-swatch',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    link: 'https://marketplace.visualstudio.com/items?itemName=FHSoftDev.flo-code',
    linkType: 'vscode',
    github: 'https://github.com/Flo0806/flo-code',
    stars: null,
    downloads: null,
    badges: [
      { label: 'VS Code Theme', icon: 'i-simple-icons-visualstudiocode', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
      { label: 'Dark', icon: 'i-heroicons-moon', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
      { label: 'Dank Mono', icon: 'i-heroicons-code-bracket', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' },
    ]
  },
  {
    key: 'nuxtathon',
    icon: 'i-heroicons-trophy',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    link: 'https://nuxtathon.live',
    linkType: 'website',
    github: 'https://github.com/Flo0806/nuxtathon',
    stars: starsOf('Flo0806/nuxtathon'),
    downloads: null,
    badges: [
      { label: 'Leaderboard', icon: 'i-heroicons-trophy', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
      { label: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    ]
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
            v-for="project in projects"
            :key="project.key"
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
                >
                <UIcon v-else :name="project.icon" :class="[project.color, 'w-8 h-8']" />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 flex flex-col">
              <h3 class="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {{ t(`projects.items.${project.key}.name`) }}
              </h3>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 min-h-18">
                {{ t(`projects.items.${project.key}.description`) }}
              </p>

              <!-- Stats Badges -->
              <div class="mt-auto pt-4 border-t border-zinc-800/30 min-h-11 flex items-center">
                <div class="flex items-center gap-2 flex-wrap">
                  <div v-if="project.stars !== null" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-400" />
                    <span class="text-xs font-medium text-yellow-400">{{ formatNumber(project.stars) }}</span>
                  </div>
                  <div v-if="(project.downloads ?? 0) > 0" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5 text-green-400" />
                    <span class="text-xs font-medium text-green-400">{{ formatNumber(project.downloads ?? 0) }}</span>
                  </div>
                  <div
                    v-for="badge in project.badges"
                    :key="badge.label"
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
                    :class="[badge.bg, badge.border]"
                  >
                    <UIcon :name="badge.icon" class="w-3.5 h-3.5" :class="badge.text" />
                    <span class="text-xs font-medium" :class="badge.text">{{ badge.label }}</span>
                  </div>
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
                <img
                  v-if="project.linkType === 'npm'"
                  src="/img/npmx-logo-mark.svg"
                  alt="npmx"
                  class="w-4 h-4 dark:block hidden"
                >
                <img
                  v-if="project.linkType === 'npm'"
                  src="/img/npmx-logo-mark-light.svg"
                  alt="npmx"
                  class="w-4 h-4 dark:hidden block"
                >
                <UIcon
                  v-if="project.linkType !== 'npm'"
                  :name="project.linkType === 'website' ? 'i-heroicons-globe-alt' : 'i-simple-icons-visualstudiocode'"
                  class="w-4 h-4"
                />
                <span>{{ project.linkType === 'npm' ? 'npmx.dev' : project.linkType === 'website' ? 'Website' : 'Marketplace' }}</span>
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
