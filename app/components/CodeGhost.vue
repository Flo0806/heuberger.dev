<script setup lang="ts">
/**
 * Glowing monitor text in the background.
 * Types a line from the start and dissolves it from the start as well - the
 * tail deliberately sets off before the head has reached the end.
 */

const SNIPPETS = [
  'if (bug !== reproducible) { console.log("works on my machine") }',
  'while (coffee.level > 0) { flo.ship() }',
  'export default defineNuxtConfig({ ssr: true /* for real this time */ })',
  'type Maybe<T> = T | undefined | "ask the backend"',
  'if (!hydrated) throw new Error("Hydration mismatch, as usual")',
  'const r730 = new Server({ noise: "jet engine", wife: "not amused" })',
  'await vorm.validate() // 47 fields, 0 errors, 1 miracle',
  'git commit -m "fix: final final v2 REALLY final"',
  'const skills = ["vue", "nuxt", "ts"] as const // the rest: Google-able',
  'if (monitor.width < 5120) { flo.complain() }',
  'useState("motivation", () => Math.random() > 0.5)',
  'pnpm install --force // what could possibly go wrong',
  'function fixLater() { /* since 2019 */ }',
  'const keychron = { switches: "clicky", colleagues: "annoyed" }',
  'if (isFriday && willDeploy) console.warn("bold")',
  'defineNuxtModule({ meta: { name: "yet-another-module" } })',
  'watch(deadline, () => scope.creep())',
  'nuxi upgrade --force // leap of faith'
]

const TYPE_MS = 45 // head speed
const ERASE_MS = 38 // tail speed, once it runs on its own
const TAIL_START = 0.85 // tail sets off at 45% of the line
const HOLD_MS = 920 // pause before the next line
const FIRST_DELAY_MS = 1200

const chars = ref<string[]>([])
const head = ref(0)
const tail = ref(0)
const top = ref('0%')
const left = ref('0%')

let timer: ReturnType<typeof setTimeout> | undefined

const run = () => {
  const line = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)] as string
  chars.value = [...line]
  head.value = 0
  tail.value = 0
  top.value = `${12 + Math.random() * 68}%`
  left.value = `${4 + Math.random() * 30}%`

  const tailStartsAt = Math.floor(line.length * TAIL_START)

  const step = () => {
    const typing = head.value < line.length
    if (typing) head.value++

    // While typing, the tail keeps pace with the head, so a travelling window
    // of roughly 45% of the line stays visible.
    if (head.value >= tailStartsAt && tail.value < line.length) tail.value++

    if (tail.value >= line.length) {
      timer = setTimeout(run, HOLD_MS)
      return
    }

    timer = setTimeout(step, typing ? TYPE_MS : ERASE_MS)
  }

  step()
}

const stateOf = (i: number) => {
  if (i < tail.value) return 'gone'
  if (i < head.value) return 'lit'
  return 'dark'
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setTimeout(run, FIRST_DELAY_MS)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div
    class="code-ghost"
    :style="{ top, left }"
    aria-hidden="true"
  >
    <span
      v-for="(ch, i) in chars"
      :key="i"
      :class="['cg-char', `cg-${stateOf(i)}`]"
    >{{ ch }}</span>
    <span
      v-if="chars.length"
      class="cg-caret"
      :style="{ left: `${head}ch` }"
    />
  </div>
</template>

<style scoped>
.code-ghost {
  position: fixed;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  white-space: pre;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, monospace;
  font-size: clamp(0.7rem, 1.1vw, 0.95rem);
}

.cg-char {
  opacity: 0;
  color: var(--color-glacier-600);
  transition: opacity 0.45s ease-out, text-shadow 0.45s ease-out;
}

.cg-lit {
  opacity: 0.5;
  text-shadow: 0 0 6px rgb(47 134 190 / 0.35);
}

/* Dissolved: characters keep their slot and only fade out, so the line does
   not jump while it disappears. */
.cg-gone {
  opacity: 0;
  text-shadow: none;
}

.cg-caret {
  position: absolute;
  top: 2px;
  width: 1px;
  height: 1.2em;
  background: #f97316;
  box-shadow: 0 0 8px rgb(249 115 22 / 0.8);
  animation: cg-blink 1s steps(2, start) infinite;
}

@keyframes cg-blink {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 0.15; }
}

.dark .cg-char {
  color: var(--color-glacier-300);
}

.dark .cg-lit {
  opacity: 0.32;
  text-shadow: 0 0 8px rgb(135 194 230 / 0.5), 0 0 22px rgb(47 134 190 / 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .code-ghost {
    display: none;
  }
}
</style>
