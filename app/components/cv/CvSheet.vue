<script setup lang="ts">
/**
 * The sheet: a single page of paper lying on the glass, slightly askew, its
 * bottom corners lifted off the surface.
 *
 * Everything else on this site is a pane of glass - cold, backlit, floating.
 * A CV is the one thing here that is meant to be picked up and handed on, so
 * it is the one thing made of paper. The material contrast is the point; it
 * also matches the stamps on the home page, which are ink on stock too.
 *
 * It carries the figures and nothing else. Whoever reads it - person or
 * screening model - should leave with five numbers and a reason to ask for
 * the rest, which is what the sections below this one are for.
 */
const { t } = useI18n();
const { cv } = useCv();

/** Splits '**Nuxt**' spans out of a paragraph so they can be bolded safely. */
const segments = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, index) => ({ text: part, strong: index % 2 === 1 }));

const print = () => window.print();

/**
 * The seal is pressed the first time the sheet is actually looked at, not on
 * load: arriving at /cv from another page would otherwise waste the moment
 * while the sheet is still sliding in.
 */
const seal = useTemplateRef<HTMLElement>('seal');
const stamped = ref(false);

let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!seal.value) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stamped.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      stamped.value = true;
      observer?.disconnect();
    },
    { threshold: 0.6 },
  );

  observer.observe(seal.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section class="sheet-section pt-28 md:pt-36 pb-10 md:pb-14">
    <div class="container mx-auto px-4">
      <div class="sheet-stage">
        <article class="sheet">
          <header class="sheet-head">
            <img
              src="/img/profile.jpeg"
              :alt="cv.name"
              width="112"
              height="112"
              class="sheet-photo"
            />

            <div class="min-w-0">
              <h1 class="sheet-name">{{ cv.name }}</h1>
              <p class="sheet-role">{{ cv.title }}</p>
              <p class="sheet-focus">{{ cv.focus }}</p>
              <p class="sheet-where">{{ cv.location }}</p>
            </div>

            <p ref="seal" class="sheet-seal" :class="stamped && 'is-stamped'">
              <UIcon name="i-simple-icons-nuxtdotjs" class="sheet-seal-mark" />
              <span>Nuxt Ecosystem</span>
              <span>Member</span>
            </p>
          </header>

          <div class="sheet-claim">
            <p class="sheet-claim-lede">{{ cv.claim[0] }}</p>
            <p class="sheet-claim-line">{{ cv.claim[1] }}</p>
          </div>

          <dl class="sheet-facts">
            <div v-for="fact in cv.facts" :key="fact.label" class="sheet-fact">
              <dt class="sheet-fact-value">
                <a v-if="fact.href" :href="fact.href" target="_blank" rel="noopener noreferrer">{{
                  fact.value
                }}</a>
                <template v-else>{{ fact.value }}</template>
              </dt>
              <dd class="sheet-fact-label">{{ fact.label }}</dd>
              <dd class="sheet-fact-note">{{ fact.note }}</dd>
            </div>
          </dl>

          <section class="sheet-summary">
            <h2 class="sheet-summary-head">{{ t('cv.sections.summary') }}</h2>
            <p v-for="(paragraph, index) in cv.summary" :key="index">
              <template v-for="(part, partIndex) in segments(paragraph)" :key="partIndex">
                <strong v-if="part.strong">{{ part.text }}</strong>
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </section>

          <footer class="sheet-foot">
            <ul class="sheet-links">
              <li v-for="link in cv.links" :key="link.href">
                <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
              </li>
            </ul>
            <p class="sheet-machine">{{ t('cv.machineLabel') }} <code>heuberger.dev/cv.md</code></p>
          </footer>
        </article>
      </div>

      <div class="sheet-actions print:hidden">
        <UButton color="primary" variant="solid" icon="i-heroicons-arrow-down-tray" @click="print">
          {{ t('cv.print') }}
        </UButton>
        <UButton
          to="/cv.md"
          external
          target="_blank"
          color="neutral"
          variant="ghost"
          icon="i-heroicons-cpu-chip"
        >
          {{ t('cv.machine') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sheet-stage {
  --paper: #faf7ef;
  --paper-edge: #ece5d4;
  --ink: #1a1f26;
  --ink-rgb: 26 31 38;
  --ink-soft: #5d6673;
  --rule: #d6cdb8;
  --mark: 166 60 24;

  position: relative;
  max-width: 58rem;
  margin: 0 auto;
}

/* The lift. Two shadows angled out from under the bottom corners: the sheet
   touches the surface in the middle and rises at the edges, so the darkness
   has to run out towards the corners rather than sit evenly under the page. */
.sheet-stage::before,
.sheet-stage::after {
  content: '';
  position: absolute;
  bottom: 2.4rem;
  width: 40%;
  height: 1rem;
  border-radius: 50%;
  box-shadow: 0 1.6rem 2.4rem rgb(3 7 12 / 0.34);
}

.sheet-stage::before {
  left: 6%;
  transform: rotate(-2deg);
}

.sheet-stage::after {
  right: 6%;
  transform: rotate(2deg);
}

.sheet {
  position: relative;
  /* The stage's shadow pseudo-elements are its last children, so without this
     the ::after one paints its blur across the bottom of the page. */
  z-index: 1;
  padding: 2rem 1.6rem 1.6rem;
  border-radius: 3px;
  /* A hairline the shadow cannot provide: in light mode paper and page are
     both pale, and without an edge the sheet dissolves into the background. */
  border: 1px solid rgb(26 31 38 / 0.07);
  background: linear-gradient(163deg, var(--paper) 0%, var(--paper) 62%, var(--paper-edge) 100%);
  color: var(--ink);
  transform: rotate(-0.9deg);
  box-shadow:
    0 1px 2px rgb(6 10 16 / 0.3),
    0 1.5rem 2.5rem -1rem rgb(3 7 12 / 0.5);
  animation: sheet-land 0.85s cubic-bezier(0.22, 1.1, 0.36, 1) backwards;
}

/* Paper, not a panel: a faint laid grain, light gathering along the top edge,
   and the two bottom corners washed out where they curl up into it. */
.sheet::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.sheet::before {
  background-image:
    repeating-linear-gradient(92deg, rgb(40 33 20 / 0.02) 0 1px, rgb(255 255 255 / 0) 1px 4px),
    linear-gradient(180deg, rgb(255 255 255 / 0.65) 0%, rgb(255 255 255 / 0) 22%);
}

@media (min-width: 48rem) {
  .sheet {
    padding: 3rem 3.25rem 2.25rem;
  }
}

@keyframes sheet-land {
  from {
    opacity: 0;
    transform: perspective(1600px) translate3d(0, -2.2rem, 7rem) rotate(-3.4deg) rotateX(7deg);
  }

  to {
    opacity: 1;
    transform: rotate(-0.9deg);
  }
}

/* ---- head ---------------------------------------------------------- */
.sheet-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 1.35rem;
  border-bottom: 1px solid var(--rule);
}

.sheet-photo {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 2px;
  object-fit: cover;
  flex-shrink: 0;
  /* Stock photo corners, the way a print is mounted on a page. */
  box-shadow:
    0 0 0 1px rgb(26 31 38 / 0.12),
    0 2px 5px rgb(26 31 38 / 0.18);
}

@media (min-width: 48rem) {
  .sheet-photo {
    width: 6rem;
    height: 6rem;
  }
}

.sheet-name {
  font-size: clamp(1.7rem, 5.2vw, 2.9rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.02;
  color: var(--ink);
}

.sheet-role {
  margin-top: 0.35rem;
  font-size: clamp(0.9rem, 2.4vw, 1.05rem);
  font-weight: 600;
  color: var(--ink);
}

.sheet-focus {
  margin-top: 0.1rem;
  font-size: clamp(0.85rem, 2.2vw, 0.98rem);
  color: var(--ink-soft);
}

.sheet-where {
  margin-top: 0.1rem;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

/* The one loud thing on the page: a membership stamp pressed into the corner
   once the sheet is looked at. Caps here are what a rubber stamp does, not a
   label, and multiply lets the paper grain come through the ink so it reads
   as pressed on rather than printed in. */
.sheet-seal {
  --seal-rot: -6.5deg;
  /* Nuxt green. Multiply pulls it down into the paper, so it lands as ink on
     stock rather than as a bright UI chip sitting on top of it. */
  --seal-ink: 0 193 114;

  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.28rem;
  margin-left: auto;
  padding: 0.7rem 0.95rem 0.6rem;
  border: 2.5px solid rgb(var(--seal-ink) / 0.85);
  border-radius: 0.45rem;
  color: rgb(var(--seal-ink) / 0.95);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
  mix-blend-mode: multiply;
  transform: rotate(var(--seal-rot));

  /* Hidden until pressed; the keyframes own the transform from there. */
  opacity: 0;
}

@media (min-width: 40rem) {
  .sheet-seal {
    display: flex;
  }
}

.sheet-seal-mark {
  width: 1.45rem;
  height: 1.45rem;
}

.sheet-seal.is-stamped {
  opacity: 1;
  animation: seal-press 0.38s cubic-bezier(0.7, 0, 0.84, 0) forwards;
}

/* Slow fall, hard landing, short rebound - a press, not a fade. The blur is
   what sells the speed on the way down. */
@keyframes seal-press {
  0% {
    opacity: 0;
    transform: scale(2.2) rotate(var(--seal-rot));
    filter: blur(2.5px);
  }

  58% {
    opacity: 1;
  }

  76% {
    transform: scale(0.93) rotate(var(--seal-rot));
    filter: blur(0);
  }

  88% {
    transform: scale(1.03) rotate(var(--seal-rot));
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(var(--seal-rot));
    filter: blur(0);
  }
}

/* ---- claim --------------------------------------------------------- */
.sheet-claim {
  padding: 1.35rem 0;
  max-width: 54ch;
}

.sheet-claim-lede {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.sheet-claim-line {
  margin-top: 0.35rem;
  font-size: clamp(1.05rem, 2.8vw, 1.38rem);
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.01em;
}

/* ---- figures ------------------------------------------------------- */
.sheet-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

@media (min-width: 40rem) {
  .sheet-facts {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 62rem) {
  .sheet-facts {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

/* Column rules, like a form: they say "these belong to one table", which a
   row of separate cards would not. */
.sheet-fact {
  padding: 1.1rem 0.9rem;
  border-left: 1px solid var(--rule);
}

.sheet-fact:first-child {
  padding-left: 0;
  border-left: 0;
}

@media (max-width: 39.99rem) {
  .sheet-fact:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (min-width: 40rem) and (max-width: 61.99rem) {
  .sheet-fact:nth-child(3n + 1) {
    padding-left: 0;
    border-left: 0;
  }
}

.sheet-fact-value {
  font-size: clamp(1.6rem, 4.4vw, 2.3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.sheet-fact-value a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgb(var(--mark) / 0.45);
  text-underline-offset: 0.22em;
  text-decoration-thickness: 2px;
}

.sheet-fact-value a:hover {
  color: rgb(var(--mark) / 1);
}

.sheet-fact-label {
  margin-top: 0.45rem;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.25;
}

.sheet-fact-note {
  margin-top: 0.2rem;
  font-size: 0.76rem;
  line-height: 1.35;
  color: var(--ink-soft);
}

/* ---- the read ------------------------------------------------------ */
.sheet-summary {
  padding: 1.35rem 0 0.35rem;
  max-width: 68ch;
}

.sheet-summary-head {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgb(var(--mark) / 0.95);
  margin-bottom: 0.5rem;
}

.sheet-summary p + p {
  margin-top: 0.6rem;
}

.sheet-summary strong {
  font-weight: 700;
}

.sheet-summary p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--ink);
}

/* ---- foot ---------------------------------------------------------- */
.sheet-foot {
  border-top: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-top: 1.15rem;
}

.sheet-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  font-size: 0.82rem;
}

.sheet-links a {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--rule);
  text-underline-offset: 0.2em;
}

.sheet-links a:hover {
  text-decoration-color: rgb(var(--mark) / 0.8);
}

.sheet-machine {
  font-size: 0.76rem;
  color: var(--ink-soft);
}

/* The only monospace on the sheet, on the only line addressed to a machine. */
.sheet-machine code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.74rem;
  color: var(--ink);
}

.sheet-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  max-width: 58rem;
  margin: 2.5rem auto 0;
}

@media (prefers-reduced-motion: reduce) {
  .sheet,
  .sheet-seal.is-stamped {
    animation: none;
  }
}

/* On paper the sheet is the page: flat, square, unshadowed. */
@media print {
  /* main.css hides every <header> and <footer> for print - that rule is aimed
     at the site chrome, but the sheet has both of its own. */
  .sheet-head,
  .sheet-foot {
    display: flex !important;
  }

  .sheet-section {
    padding-top: 0 !important;
    padding-bottom: 0.6rem !important;
  }

  /* Scoped rules outrank Tailwind's print:hidden, so say it here instead. */
  .sheet-actions {
    display: none !important;
  }

  .sheet-stage::before,
  .sheet-stage::after {
    display: none;
  }

  .sheet {
    padding: 0 0 1rem;
    transform: none;
    background: #fff;
    box-shadow: none;
    border-radius: 0;
    animation: none;
  }

  .sheet::before {
    display: none;
  }

  .sheet-seal {
    display: flex;
    opacity: 1;
    animation: none;
  }
}
</style>
