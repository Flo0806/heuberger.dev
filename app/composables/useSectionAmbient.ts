/**
 * Drives the ambient stripe colour from whichever section is currently under
 * the viewport centre.
 *
 * The colour is written to a registered custom property on the .ambient
 * element, so CSS interpolates it - see the `@property --ambient-stripe`
 * block in main.css. JS only ever sets the target value; the fade itself is
 * a CSS transition.
 *
 * It goes on .ambient rather than <html> on purpose: as an inherited property
 * on the root, every section change invalidated the style of the entire
 * document and cost 30-40ms of forced reflow per switch.
 */

/** Cool at the top, warm at the bottom. Kept pastel - these sit at ~5% alpha. */
const SECTION_STRIPE: Record<string, string> = {
  hero: '#87c2e6',
  about: '#78cfe0',
  company: '#6fd3c9',
  employer: '#72d4ac',
  skills: '#84d693',
  projects: '#a9d78d',
  uses: '#e7c079',
  hardware: '#f0a670',
  contact: '#ef9a86'
}

export function useSectionAmbient() {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const ambient = document.querySelector<HTMLElement>('.ambient')
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[id]')
    ).filter(section => section.id in SECTION_STRIPE)

    if (!ambient || !sections.length) return

    // Collapsing the root to a zero-height line at the viewport centre means
    // exactly one section intersects at a time, however tall the sections are.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const colour = SECTION_STRIPE[(entry.target as HTMLElement).id]
          if (colour) {
            ambient.style.setProperty('--ambient-stripe', colour)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach(section => observer?.observe(section))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
