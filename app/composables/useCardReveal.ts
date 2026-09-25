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

/**
 * Released just *before* a card reaches the viewport, not after.
 *
 * IntersectionObserver measures the transformed box, and the hidden state
 * pushes every card 30px down (see main.css). A negative bottom margin adds to
 * that offset: with -8% on a 900px viewport the two together left a ~100px
 * dead band where a card was plainly on screen and still counted as outside,
 * so stopping the scroll there left it blank.
 */
const ROOT_MARGIN = '0px 0px 10% 0px'

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
  let stopScrollWatch: (() => void) | undefined

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

    const reveal = (card: HTMLElement) => {
      card.classList.add(IN_CLASS)
      observer?.unobserve(card)
    }

    const pending = () => cards.filter(card => !card.classList.contains(IN_CLASS))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach(reveal)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement)
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 }
    )

    cards.forEach(card => observer?.observe(card))

    /**
     * Second line of defence: anything on screen once a scroll settles gets
     * shown, whether or not the observer agreed. A card left blank in front of
     * the reader is a bug; revealing one a moment early is not. Detaches itself
     * as soon as every card is out, so it costs nothing for the rest of the visit.
     */
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const waiting = pending()
        if (!waiting.length) {
          stopScrollWatch?.()
          return
        }
        waiting
          .filter((card) => {
            const rect = card.getBoundingClientRect()
            return rect.top < window.innerHeight && rect.bottom > 0
          })
          .forEach(reveal)
      })
    }

    stopScrollWatch = () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      stopScrollWatch = undefined
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    safetyNet = setTimeout(() => {
      pending()
        .filter(card => card.getBoundingClientRect().top < window.innerHeight)
        .forEach(reveal)
    }, SAFETY_NET_MS)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    stopScrollWatch?.()
    if (safetyNet) clearTimeout(safetyNet)
  })
}
