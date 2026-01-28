interface GitHubRepo {
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
}

const GITHUB_USERNAME = 'Flo0806'

// Configure which repos to show
const FEATURED_REPOS = [
  'vorm',
  'heuberger.dev',
  'dm-hero',
  'nuxt.care'
]

export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()

  // Fetch only the configured repos
  const repoPromises = FEATURED_REPOS.map(repo =>
    $fetch<GitHubRepo>(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${config.githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'heuberger.dev'
        }
      }
    ).catch(() => null)
  )

  const repos = (await Promise.all(repoPromises)).filter((repo): repo is GitHubRepo => repo !== null)

  // Sort by stars
  repos.sort((a, b) => b.stargazers_count - a.stargazers_count)

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  return {
    totalStars,
    repos: repos.map(repo => ({
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language
    }))
  }
}, {
  maxAge: 60 * 5, // 5 minutes
  staleMaxAge: 60 * 60, // 1 hour stale-while-revalidate
  name: 'github-stats'
})
