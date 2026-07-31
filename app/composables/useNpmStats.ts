/**
 * Single access point for /api/npm-stats.
 *
 * Kept in a composable for the same reason as useGithubStats(): useFetch calls
 * sharing a key must share their options exactly, or Nuxt raises NUXT_E3004.
 *
 * The endpoint is server-side and cached for six hours, so the registry is hit
 * at most a handful of times a day no matter how much traffic arrives.
 */
export interface NpmStats {
  count: number
  packages: string[]
}

export function useNpmStats() {
  return useFetch<NpmStats>('/api/npm-stats', {
    key: 'npm-stats',
    default: (): NpmStats => ({ count: 0, packages: [] })
  })
}
