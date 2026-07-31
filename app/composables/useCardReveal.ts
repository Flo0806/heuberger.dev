/**
 * Fades each glass card in the first time it enters the viewport, then stops
 * watching it — scrolling back never replays it.
 *
 * Observed per card rather than per section, so the stagger falls out of the
 * layout and a section taller than the viewport builds up while scrolling
 * instead of arriving all at once.
 *
 * The hidden state lives in CSS (`main section .glass` in main.css) so the
 * server-rendered markup is never painted visible and then yanked away on
 * hydration.
 */

/** Nothing may stay hidden. If anything went wrong, show everything. */
const SAFETY_NET_MS = 2500

const IN_CLASS = 'card-in'

/** Sideways scatter before settling, in px — assembling, not thrown in. */
const SCATTER_X = 14
/** Tilt before settling, in degrees. Beyond ~3 the text visibly shears. */
const SCATTER_ROT = 2.4
/** Random start offset so cards in one row never move in lockstep. */
const JITTER_MS = 90

/**
 * Seeded from the card's index rather than Math.random(), so a card keeps its
 * scatter across HMR reloads and the layout does not reshuffle while styling.
 */
const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

export function useCardReveal() {
  let observer: IntersectionObserver | undefined
  let safetyNet: ReturnType<typeof setTimeout> | undefined

  onMounted(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('main section .glass')
    )
    if (!cards.length) return

    cards.forEach((card, index) => {
      const x = (seeded(index, 1) * 2 - 1) * SCATTER_X
      const rot = (seeded(index, 2) * 2 - 1) * SCATTER_ROT
      card.style.setProperty('--card-from-x', `${x.toFixed(1)}px`)
      card.style.setProperty('--card-from-rot', `${rot.toFixed(2)}deg`)
      card.style.setProperty('--card-delay', `${Math.round(seeded(index, 3) * JITTER_MS)}ms`)
    })

    const showAll = () => cards.forEach(card => card.classList.add(IN_CLASS))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add(IN_CLASS)
          observer?.unobserve(entry.target)
        }
      },
      // threshold 0 so a card fires the moment any sliver of it is in frame;
      // the bottom inset just holds it back from starting flush at the edge.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    )

    cards.forEach(card => observer?.observe(card))

    safetyNet = setTimeout(() => {
      cards
        .filter(card => !card.classList.contains(IN_CLASS)
          && card.getBoundingClientRect().top < window.innerHeight)
        .forEach(card => card.classList.add(IN_CLASS))
    }, SAFETY_NET_MS)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    if (safetyNet) clearTimeout(safetyNet)
  })
}
