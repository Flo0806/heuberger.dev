/**
 * Single access point for /api/github-stats.
 *
 * Both GitHubStats.vue and ProjectsSection.vue need this data. Calling
 * useFetch with the same key from two places only works if the options match
 * exactly — differing `default` values trip NUXT_E3004. Keeping the call in
 * one composable makes that impossible to get wrong, and both components end
 * up sharing a single request and a single payload.
 *
 * The endpoint itself is server-side, token-authenticated and cached for five
 * minutes. Never call api.github.com from the browser instead: unauthenticated
 * requests are capped at 60 per hour per IP, shared across all visitors.
 */
export interface GithubRepoStat {
  name: string
  fullName: string
  url: string
  description: string | null
  stars: number
  language: string | null
}

export interface GithubStats {
  totalStars: number
  repos: GithubRepoStat[]
}

export function useGithubStats() {
  return useFetch<GithubStats>('/api/github-stats', {
    key: 'github-stats',
    default: (): GithubStats => ({ totalStars: 0, repos: [] })
  })
}
