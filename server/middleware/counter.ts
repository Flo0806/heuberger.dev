// Common bot patterns
const BOT_PATTERNS = [
  /bot/i, /crawl/i, /spider/i, /slurp/i, /feed/i,
  /googlebot/i, /bingbot/i, /yandex/i, /baidu/i,
  /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
  /whatsapp/i, /telegrambot/i, /discordbot/i,
  /applebot/i, /duckduckbot/i, /semrush/i, /ahrefs/i,
  /mj12bot/i, /dotbot/i, /petalbot/i, /bytespider/i,
  /gptbot/i, /claudebot/i, /anthropic/i, /chatgpt/i,
  /headless/i, /phantom/i, /selenium/i, /puppeteer/i,
  /lighthouse/i, /pagespeed/i, /pingdom/i, /uptimerobot/i
]

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return true // No UA = likely bot
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent))
}

export default defineEventHandler(async (event) => {
  // Only count page requests, not API calls or assets
  const path = getRequestURL(event).pathname
  if (path.startsWith('/api/') || path.startsWith('/_') || path.includes('.')) {
    return
  }

  // Ignore bots
  const userAgent = getHeader(event, 'user-agent')
  if (isBot(userAgent)) {
    return
  }

  const storage = useStorage('data')
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  // Always increment raw counters (every request)
  const total = (await storage.getItem<number>('counter:total')) || 0
  const day = (await storage.getItem<number>(`counter:day:${today}`)) || 0
  const monthTotal = (await storage.getItem<number>(`counter:month:${month}`)) || 0
  await storage.setItem('counter:total', total + 1)
  await storage.setItem(`counter:day:${today}`, day + 1)
  await storage.setItem(`counter:month:${month}`, monthTotal + 1)

  // Get client IP for unique counting
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const ipHash = hashIP(ip)
  const dayIpKey = `visitors:day:${today}:${ipHash}`
  const monthIpKey = `visitors:month:${month}:${ipHash}`
  const totalIpKey = `visitors:total:${ipHash}`

  // Check if this IP already visited today
  const alreadyVisitedToday = await storage.hasItem(dayIpKey)
  if (!alreadyVisitedToday) {
    await storage.setItem(dayIpKey, true)
    const dayIP = (await storage.getItem<number>(`counter:dayIP:${today}`)) || 0
    await storage.setItem(`counter:dayIP:${today}`, dayIP + 1)
  }

  // Check if this IP already visited this month
  const alreadyVisitedMonth = await storage.hasItem(monthIpKey)
  if (!alreadyVisitedMonth) {
    await storage.setItem(monthIpKey, true)
    const monthIP = (await storage.getItem<number>(`counter:monthIP:${month}`)) || 0
    await storage.setItem(`counter:monthIP:${month}`, monthIP + 1)
  }

  // Check if this IP ever visited
  const alreadyVisitedEver = await storage.hasItem(totalIpKey)
  if (!alreadyVisitedEver) {
    await storage.setItem(totalIpKey, true)
    const totalIP = (await storage.getItem<number>('counter:totalIP')) || 0
    await storage.setItem('counter:totalIP', totalIP + 1)
  }
})

// Simple hash function for IP (privacy)
function hashIP(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}
