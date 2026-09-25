<script setup lang="ts">
/** Education, languages and the job-ad vocabulary - the ATS tail of the page. */
const { t } = useI18n();
const { cv, range } = useCv();
</script>

<template>
  <section class="section-padding py-8 md:py-10 pb-20">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto grid lg:grid-cols-5 gap-4 print:grid-cols-1">
        <div class="glass rounded-2xl p-6 md:p-8 lg:col-span-3">
          <h2
            class="text-sm font-medium uppercase tracking-wide text-zinc-500 mb-4 print:text-base print:normal-case print:font-bold print:text-black"
          >
            {{ t('cv.sections.education') }}
          </h2>
          <ol class="space-y-4">
            <li v-for="item in cv.education" :key="item.title">
              <p class="text-xs font-medium text-zinc-500 mb-0.5">
                <time :datetime="item.from">{{ range(item.from, item.to) }}</time>
              </p>
              <h3 class="font-semibold text-zinc-900 dark:text-zinc-100">{{ item.title }}</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ item.org }}</p>
              <p v-if="item.note" class="text-sm text-zinc-500 mt-1">{{ item.note }}</p>
            </li>
          </ol>
        </div>

        <div class="lg:col-span-2 flex flex-col gap-4">
          <div class="glass rounded-2xl p-6 md:p-8">
            <h2
              class="text-sm font-medium uppercase tracking-wide text-zinc-500 mb-4 print:text-base print:normal-case print:font-bold print:text-black"
            >
              {{ t('cv.sections.languages') }}
            </h2>
            <dl class="space-y-2">
              <div v-for="language in cv.languages" :key="language.name">
                <dt class="font-semibold text-zinc-900 dark:text-zinc-100">{{ language.name }}</dt>
                <dd class="text-sm text-zinc-600 dark:text-zinc-400">{{ language.level }}</dd>
              </div>
            </dl>
          </div>

          <div class="glass rounded-2xl p-6 md:p-8 flex-1">
            <h2
              class="text-sm font-medium uppercase tracking-wide text-zinc-500 mb-3 print:text-base print:normal-case print:font-bold print:text-black"
            >
              {{ t('cv.sections.keywords') }}
            </h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ cv.keywords.join(' · ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
