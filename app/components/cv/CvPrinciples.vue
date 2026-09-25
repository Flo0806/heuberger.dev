<script setup lang="ts">
/**
 * "How I work" - the section a 2026 screener scans for: what the candidate
 * does with AI, and what keeps the output stable. Deliberately placed before
 * the timeline; it frames how every entry below was built.
 */
const { t } = useI18n();
const { cv } = useCv();
</script>

<template>
  <section class="section-padding py-8 md:py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <div class="mb-6 print:mb-3">
          <h2 class="text-2xl md:text-3xl font-bold mb-1 print:text-xl">
            <span class="gradient-text">{{ t('cv.sections.principles') }}</span>
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm print:hidden">
            {{ t('cv.sections.principlesSubtitle') }}
          </p>
        </div>

        <ul class="grid sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
          <li
            v-for="principle in cv.principles"
            :key="principle.title"
            class="glass rounded-2xl p-6 flex gap-4"
          >
            <div
              class="w-11 h-11 rounded-xl bg-linear-to-br from-glacier-500/20 to-glacier-400/10 flex items-center justify-center shrink-0 print:hidden"
            >
              <UIcon
                :name="principle.icon"
                class="w-5 h-5 text-glacier-600 dark:text-glacier-300"
              />
            </div>
            <div>
              <h3 class="font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                {{ principle.title }}
              </h3>
              <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {{ principle.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
