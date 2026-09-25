<script setup lang="ts">
import type { CvEntry } from '#shared/cv';
import CvTimelineEntry from './CvTimelineEntry.vue';

/**
 * Dual-track timeline: software on the left, craft and leadership on the
 * right, one spine down the middle.
 *
 * Entries that overlap in time share a row, so the two years in which a
 * bakery team lead was retraining at night sit side by side - that overlap
 * is the whole point of the story, and two separate lists would hide it.
 * Everything else gets its own row; the empty lane opposite reads as "the
 * other career was silent here".
 *
 * Below md the grid is one column and auto-placement does the right thing:
 * dot, then one card under the other. From md up every child is pinned to
 * its row via --row, because sparse auto-placement would push a left-lane
 * card that follows the spine cell down a row (see the media rule below).
 */
const { t } = useI18n();
const { cv, range } = useCv();

interface Row {
  tech?: CvEntry;
  craft?: CvEntry;
}

const overlaps = (a: CvEntry, b: CvEntry) =>
  a.from <= (b.to ?? '9999') && b.from <= (a.to ?? '9999');

const rows = computed<Row[]>(() => {
  const sorted = [...cv.value.entries].sort((a, b) => (a.from < b.from ? 1 : -1));
  const result: Row[] = [];
  for (const entry of sorted) {
    const last = result.at(-1);
    const other = entry.track === 'tech' ? last?.craft : last?.tech;
    if (last && !last[entry.track] && other && overlaps(entry, other)) {
      last[entry.track] = entry;
    } else {
      result.push({ [entry.track]: entry });
    }
  }
  return result;
});

const yearOf = (row: Row) => {
  const from = [row.tech?.from, row.craft?.from].filter(Boolean).sort().at(-1)!;
  return from.slice(0, 4);
};

/** Show the year on the spine only when it changes from the row above. */
const showYear = (index: number) =>
  index === 0 || yearOf(rows.value[index]!) !== yearOf(rows.value[index - 1]!);

/** Newest entry in the row colours the dot. */
const dotTrack = (row: Row) =>
  row.tech && row.craft
    ? row.tech.from >= row.craft.from
      ? 'tech'
      : 'craft'
    : row.tech
      ? 'tech'
      : 'craft';
</script>

<template>
  <section class="section-padding py-8 md:py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10 print:text-left print:mb-4">
          <h2 class="text-3xl md:text-4xl font-bold mb-3 print:text-xl">
            <span class="gradient-text">{{ t('cv.sections.timeline') }}</span>
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 print:hidden">
            {{ t('cv.sections.timelineSubtitle') }}
          </p>
        </div>

        <!-- Lane headers (desktop) -->
        <div class="hidden md:grid grid-cols-[1fr_3.5rem_1fr] mb-6 print:hidden">
          <div class="text-right text-sm font-semibold text-glacier-600 dark:text-glacier-300 pr-2">
            <UIcon
              name="i-heroicons-code-bracket"
              class="w-4 h-4 inline-block align-text-bottom mr-1"
            />
            {{ t('cv.sections.tech') }}
          </div>
          <div />
          <div class="text-sm font-semibold text-orange-500 dark:text-orange-400 pl-2">
            <UIcon name="i-heroicons-fire" class="w-4 h-4 inline-block align-text-bottom mr-1" />
            {{ t('cv.sections.craft') }}
          </div>
        </div>

        <ol
          class="cv-timeline relative grid grid-cols-[2rem_1fr] md:grid-cols-[1fr_3.5rem_1fr] gap-y-4 md:gap-y-6"
        >
          <li
            v-for="(row, index) in rows"
            :key="index"
            class="contents"
            :style="{ '--row': index + 1 }"
          >
            <!-- Spine: dot + year -->
            <div
              class="relative flex flex-col items-center col-start-1 md:col-start-2"
              aria-hidden="true"
            >
              <span
                class="cv-dot mt-6 md:mt-7"
                :class="dotTrack(row) === 'tech' ? 'cv-dot-tech' : 'cv-dot-craft'"
              />
              <span v-if="showYear(index)" class="cv-year">{{ yearOf(row) }}</span>
            </div>

            <!-- Tech lane -->
            <CvTimelineEntry
              v-if="row.tech"
              :entry="row.tech"
              class="col-start-2 md:col-start-1 md:text-right"
            />

            <!-- Craft lane -->
            <CvTimelineEntry
              v-if="row.craft"
              :entry="row.craft"
              class="col-start-2 md:col-start-3"
            />
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The spine: one line through the middle column, drawn behind the dots. */
.cv-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(1rem - 1px);
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    rgb(47 134 190 / 0) 0%,
    rgb(47 134 190 / 0.35) 6%,
    rgb(249 115 22 / 0.35) 94%,
    rgb(249 115 22 / 0) 100%
  );
}

@media (min-width: 48rem) {
  .cv-timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }

  .cv-timeline > li > * {
    grid-row: var(--row);
  }
}

.cv-dot {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 9999px;
  border: 2px solid var(--color-ink-50);
  box-shadow: 0 0 0 3px rgb(var(--glass-tint) / 0.35);
  flex-shrink: 0;
}

.dark .cv-dot {
  border-color: var(--color-ink-950);
}

.cv-dot-tech {
  background: var(--color-glacier-500);
}

.cv-dot-craft {
  background: #f97316;
}

.cv-year {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-ink-500);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

@media (min-width: 48rem) {
  .cv-year {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 0.75rem;
  }
}
</style>
