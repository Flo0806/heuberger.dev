<script setup lang="ts">
import type { CvEntry } from '#shared/cv';

/**
 * One card on the timeline. The tech lane is right-aligned by the parent so
 * both lanes face the spine; bullets and tags follow that alignment.
 */
const { entry } = defineProps<{ entry: CvEntry }>();

const { t } = useI18n();
const { range } = useCv();

const tech = computed(() => entry.track === 'tech');
</script>

<template>
  <article class="glass rounded-2xl p-5 md:p-6" :class="entry.pivot && 'cv-pivot'">
    <p class="text-xs mb-1 md:hidden">
      <span class="cv-lane-badge" :class="tech ? 'cv-lane-tech' : 'cv-lane-craft'">{{
        t(`cv.sections.${entry.track}`)
      }}</span>
    </p>
    <p
      class="text-xs font-medium mb-1 flex items-center gap-1.5"
      :class="[
        tech && 'md:justify-end',
        entry.pivot
          ? 'text-orange-500 dark:text-orange-400 font-semibold uppercase tracking-wide'
          : 'text-zinc-500',
      ]"
    >
      <UIcon v-if="entry.pivot" name="i-heroicons-arrows-right-left" class="w-3.5 h-3.5" />
      <time :datetime="entry.from">{{ range(entry.from, entry.to) }}</time>
      <span v-if="entry.location">· {{ entry.location }}</span>
    </p>
    <h3 class="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
      {{ entry.role }}
    </h3>
    <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
      <a
        v-if="entry.orgHref"
        :href="entry.orgHref"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-orange-500 transition-colors"
        >{{ entry.org }}</a
      >
      <template v-else>{{ entry.org }}</template>
    </p>
    <p v-if="entry.summary" class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {{ entry.summary }}
    </p>
    <ul
      v-if="entry.bullets?.length"
      class="mt-3 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300"
    >
      <li
        v-for="bullet in entry.bullets"
        :key="bullet"
        class="cv-bullet"
        :class="[
          tech ? 'cv-bullet-tech' : 'cv-bullet-craft',
          bullet.startsWith('[TODO]') && 'cv-todo',
        ]"
      >
        {{ bullet }}
      </li>
    </ul>
    <p v-if="entry.reason" class="mt-3 text-xs italic text-zinc-500 leading-relaxed">
      <span class="not-italic font-semibold text-orange-500 dark:text-orange-400">{{
        t('cv.reason')
      }}</span>
      {{ entry.reason }}
    </p>
    <ul
      v-if="entry.tags?.length"
      class="flex flex-wrap gap-1.5 mt-4"
      :class="tech && 'md:justify-end'"
    >
      <li v-for="tag in entry.tags" :key="tag" class="cv-tag">{{ tag }}</li>
    </ul>
  </article>
</template>

<style scoped>
.cv-tag {
  font-size: 0.7rem;
  line-height: 1;
  padding: 0.35rem 0.55rem;
  border-radius: 0.5rem;
  background: rgb(var(--glass-tint) / 0.35);
  border: 1px solid var(--glass-rim-lo);
  color: var(--color-ink-700);
}

.dark .cv-tag {
  color: var(--color-ink-200);
}

.cv-lane-badge {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
}

.cv-lane-tech {
  color: var(--color-glacier-600);
  background: rgb(47 134 190 / 0.12);
}

.dark .cv-lane-tech {
  color: var(--color-glacier-300);
}

.cv-lane-craft {
  color: #ea580c;
  background: rgb(249 115 22 / 0.12);
}

.dark .cv-lane-craft {
  color: #fb923c;
}

/* Bullets with a coloured tick, mirrored on the tech lane so the marks face
   the spine. */
.cv-bullet {
  position: relative;
  padding-left: 1rem;
}

.cv-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: #f97316;
}

.cv-bullet-tech::before {
  background: var(--color-glacier-500);
}

@media (min-width: 48rem) {
  .cv-bullet-tech {
    padding-left: 0;
    padding-right: 1rem;
  }

  .cv-bullet-tech::before {
    left: auto;
    right: 0;
  }
}

/* Placeholder bullets: loud on purpose until the real facts are in. */
.cv-todo {
  color: #dc2626;
  font-style: italic;
}

.dark .cv-todo {
  color: #f87171;
}

/* The pivot card gets the warm edge permanently - it is the one card on the
   timeline that should draw the eye first. */
.cv-pivot {
  border-color: rgb(249 115 22 / 0.35);
  box-shadow:
    var(--glass-shadow),
    0 0 0 1px rgb(249 115 22 / 0.12);
}
</style>
