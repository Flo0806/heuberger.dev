<script setup lang="ts">
/**
 * "Creator of" strip: flagship projects, stamped in one after another.
 *
 * The list drives everything - add an entry plus its i18n keys and the grid
 * wraps at three per row on its own.
 *
 * Deliberately the only surface on the page that is not glass. A stamp is ink
 * pressed onto paper, not a pane held in front of it - the material contrast
 * is what makes the strip read as a mark of authorship rather than as another
 * card row.
 */
const { t } = useI18n();

const creations = [
  { key: 'jasy', href: 'https://jasy.dev', rotate: '-1.6deg' },
  { key: 'dmHero', href: 'https://dm-hero.com', rotate: '1.2deg' },
  { key: 'jano', href: 'https://janoeditor.dev', rotate: '-0.9deg' },
  { key: 'nuxtCare', href: 'https://nuxt.care', rotate: '1.5deg' },
];

/** Gap between two impacts. Short enough to read as one burst. */
const STAMP_INTERVAL_MS = 430;
/** Ceiling for the whole sequence, so a longer list does not drag on. */
const STAMP_WINDOW_MS = 1700;
/** How long the whole strip rattles after an impact. */
const SHAKE_MS = 300;

const stamped = ref(new Set<string>());
const shaking = ref(false);
const strip = useTemplateRef<HTMLElement>('strip');

let observer: IntersectionObserver | undefined;
const timers: ReturnType<typeof setTimeout>[] = [];

const stampAll = () => {
  const step = Math.min(STAMP_INTERVAL_MS, STAMP_WINDOW_MS / Math.max(creations.length - 1, 1));

  creations.forEach((creation, index) => {
    timers.push(
      setTimeout(() => {
        stamped.value = new Set([...stamped.value, creation.key]);
        // The shake belongs to the impact, so it restarts on every hit
        // instead of running once for the whole sequence.
        shaking.value = false;
        requestAnimationFrame(() => {
          shaking.value = true;
          timers.push(setTimeout(() => (shaking.value = false), SHAKE_MS));
        });
      }, index * step),
    );
  });
};

onMounted(() => {
  if (!strip.value) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stamped.value = new Set(creations.map((creation) => creation.key));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer?.disconnect();
      stampAll();
    },
    { rootMargin: '0px 0px -15% 0px', threshold: 0 },
  );
  observer.observe(strip.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  timers.forEach(clearTimeout);
});
</script>

<template>
  <section id="creator" class="pt-10 md:pt-12">
    <div class="container mx-auto px-4">
      <!-- Label beside the grid, not inside it: with more than one row an
           inline label would sit in the flow and push the first stamp out of
           alignment with the ones below it. -->
      <div
        ref="strip"
        class="creator-strip mx-auto flex max-w-5xl flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-7"
        :class="{ 'is-shaking': shaking }"
      >
        <p class="creator-label shrink-0 lg:pt-4">
          {{ t('creator.title') }}
        </p>

        <!-- Three per row on desktop, then it wraps. Adding entries to
             `creations` needs no layout change. -->
        <div class="grid w-full flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="creation in creations"
            :key="creation.key"
            :href="creation.href"
            target="_blank"
            rel="noopener noreferrer"
            class="stamp"
            :class="{ 'is-stamped': stamped.has(creation.key) }"
            :style="{ '--stamp-rot': creation.rotate }"
          >
            <span class="stamp-name">{{ t(`creator.items.${creation.key}.name`) }}</span>
            <span class="stamp-claim">{{ t(`creator.items.${creation.key}.claim`) }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.creator-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-glacier-600);
  white-space: nowrap;
}

.dark .creator-label {
  color: var(--color-glacier-300);
}

/* The rattle sits on the wrapper, so every stamp shakes the whole strip -
   label included. Restarted per impact from the component. */
.creator-strip.is-shaking {
  animation: creator-shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes creator-shake {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  12% {
    transform: translate3d(-4px, 2px, 0) rotate(-0.3deg);
  }
  28% {
    transform: translate3d(4px, -2px, 0) rotate(0.3deg);
  }
  46% {
    transform: translate3d(-3px, 1px, 0) rotate(-0.18deg);
  }
  64% {
    transform: translate3d(3px, -1px, 0) rotate(0.14deg);
  }
  82% {
    transform: translate3d(-1px, 1px, 0) rotate(0deg);
  }
}

.stamp {
  --stamp-ink: 249 115 22;

  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.85rem 1.15rem;
  border: 2px solid rgb(var(--stamp-ink) / 0.55);
  border-radius: 0.55rem;
  text-align: center;
  transform: rotate(var(--stamp-rot, 0deg));
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  /* Hidden until stamped, but with no transform of its own - the keyframes
     own the transform, otherwise the two fight over the same property. */
  opacity: 0;
}

.stamp.is-stamped {
  opacity: 1;
  animation: stamp-hit 0.34s cubic-bezier(0.7, 0, 0.84, 0) forwards;
}

.stamp:hover {
  border-color: rgb(var(--stamp-ink) / 0.9);
  background-color: rgb(var(--stamp-ink) / 0.07);
}

/* Slow descent, then a hard landing with a short rebound - a press, not a
   fade. The blur sells the speed on the way down. */
@keyframes stamp-hit {
  0% {
    opacity: 0;
    transform: scale(2.4) rotate(var(--stamp-rot, 0deg));
    filter: blur(3px);
  }
  55% {
    opacity: 1;
  }
  72% {
    transform: scale(0.93) rotate(var(--stamp-rot, 0deg));
    filter: blur(0);
  }
  86% {
    transform: scale(1.04) rotate(var(--stamp-rot, 0deg));
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(var(--stamp-rot, 0deg));
    filter: blur(0);
  }
}

.stamp-name {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--stamp-ink) / 1);
}

.stamp-claim {
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--color-ink-600);
}

.dark .stamp-claim {
  color: var(--color-ink-200);
}

@media (prefers-reduced-motion: reduce) {
  .stamp {
    opacity: 1;
    animation: none;
  }

  .creator-strip.is-shaking {
    animation: none;
  }
}
</style>
