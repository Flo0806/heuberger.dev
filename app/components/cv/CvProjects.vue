<script setup lang="ts">
/** Open source as work history: every card is a link, every claim checkable. */
const { t } = useI18n();
const { cv } = useCv();
</script>

<template>
  <section class="section-padding py-8 md:py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <div class="mb-6 print:mb-3">
          <h2 class="text-2xl md:text-3xl font-bold mb-1 print:text-xl">
            <span class="gradient-text">{{ t('cv.sections.projects') }}</span>
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm print:hidden">
            {{ t('cv.sections.projectsSubtitle') }}
          </p>
        </div>

        <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2 print:gap-2">
          <li v-for="project in cv.projects" :key="project.name">
            <a
              :href="project.href"
              target="_blank"
              rel="noopener noreferrer"
              class="glass glass-interactive rounded-2xl p-5 h-full flex flex-col"
            >
              <h3 class="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-1">
                {{ project.name }}
                <UIcon
                  name="i-heroicons-arrow-top-right-on-square"
                  class="w-3.5 h-3.5 text-zinc-400 print:hidden"
                />
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                {{ project.description }}
              </p>
              <ul class="flex flex-wrap gap-1.5 mt-3">
                <li
                  v-for="tag in project.tags"
                  :key="tag"
                  class="text-[0.7rem] leading-none px-2 py-1.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300"
                >
                  {{ tag }}
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
