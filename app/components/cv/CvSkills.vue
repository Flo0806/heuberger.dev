<script setup lang="ts">
/**
 * Skills as plain text in the DOM, grouped. Icons-only skill walls look good
 * and are invisible to a parser; this one is read by both.
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
            <span class="gradient-text">{{ t('cv.sections.skills') }}</span>
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm print:hidden">
            {{ t('cv.sections.skillsSubtitle') }}
          </p>
        </div>

        <div class="glass rounded-2xl p-6 md:p-8">
          <dl
            class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 print:grid-cols-3 print:gap-y-3"
          >
            <div v-for="group in cv.skills" :key="group.label">
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-orange-500 dark:text-orange-400 mb-2"
              >
                {{ group.label }}
              </dt>
              <dd>
                <ul class="flex flex-wrap gap-1.5">
                  <li v-for="skill in group.skills" :key="skill.name" class="cv-skill">
                    {{ skill.name }}
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-skill {
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0.45rem 0.65rem;
  border-radius: 0.5rem;
  background: rgb(var(--glass-tint) / 0.35);
  border: 1px solid var(--glass-rim-lo);
  color: var(--color-ink-800);
}

.dark .cv-skill {
  color: var(--color-ink-100);
}
</style>
