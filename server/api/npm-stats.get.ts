/**
 * How many npm packages are published under this maintainer.
 *
 * A single `maintainer:` search covers the personal packages *and* every org
 * scope (@jasy, @jano-editor, @flumen-dev, ...) in one request, so no list of
 * scopes has to be kept in sync here — publishing under a new org is picked
 * up automatically.
 */
const MAINTAINER = 'flogersoft'

/** The registry search API caps one page at 250, far above the current count. */
const PAGE_SIZE = 250

interface NpmSearchResponse {
  total: number
  objects: { package: { name: string } }[]
}

export default defineCachedEventHandler(async () => {
  const result = await $fetch<NpmSearchResponse>(
    'https://registry.npmjs.org/-/v1/search',
    {
      query: { text: `maintainer:${MAINTAINER}`, size: PAGE_SIZE },
      headers: { 'User-Agent': 'heuberger.dev' }
    }
  ).catch(() => null)

  if (!result) return { count: 0, packages: [] }

  const packages = result.objects.map(entry => entry.package.name).sort()

  return { count: packages.length, packages }
}, {
  // Publishing is not a per-minute event, so this is cached hard.
  maxAge: 60 * 60 * 6,
  // A whole day of stale-while-revalidate: yesterday's number beats none.
  staleMaxAge: 60 * 60 * 24,
  name: 'npm-stats'
})
