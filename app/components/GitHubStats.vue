<script setup lang="ts">
const { t } = useI18n()
const { data: stats } = await useFetch('/api/github-stats')

const getRepoKey = (name: string) => name.replace(/\./g, '-')
</script>

<template>
  <div
    v-if="stats"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    class="glass rounded-2xl p-6 max-w-2xl mx-auto"
  >
    <!-- Total Stars -->
    <a
      href="https://github.com/Flo0806"
      target="_blank"
      rel="noopener noreferrer"
      class="block text-center mb-4 group cursor-pointer"
    >
      <span class="text-zinc-500 dark:text-zinc-400 text-sm">{{ t('github.title') }}</span>
      <div class="text-2xl font-bold mt-1 group-hover:text-orange-400 transition-colors">
        <span class="text-white">{{ stats.totalStars }}</span>
        <span class="ml-1">{{ t('github.stars') }}</span>
      </div>
    </a>

    <!-- Repo Badges -->
    <div class="flex flex-wrap justify-center gap-3">
      <UTooltip
        v-for="repo in stats.repos"
        :key="repo.name"
        :text="t(`github.repos.${getRepoKey(repo.name)}`)"
      >
        <a
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="glass px-4 py-2 rounded-xl flex items-center gap-2 hover:border-orange-500/50 hover:scale-105 transition-all cursor-pointer group"
        >
          <UIcon name="i-simple-icons-github" class="w-4 h-4 text-zinc-400 group-hover:text-orange-400 transition-colors" />
          <span class="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{{ repo.name }}</span>
          <span class="text-sm text-zinc-500">{{ repo.stars }}</span>
          <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        </a>
      </UTooltip>
    </div>
  </div>
</template>
