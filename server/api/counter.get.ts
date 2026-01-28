export default defineEventHandler(async (event) => {
  // CORS for localhost development
  const origin = getHeader(event, 'origin')
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3200']

  if (origin && allowedOrigins.includes(origin)) {
    setHeader(event, 'Access-Control-Allow-Origin', origin)
    setHeader(event, 'Access-Control-Allow-Methods', 'GET')
  }

  // Prevent Google indexing
  setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')

  const storage = useStorage('data')
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  return {
    since: '2025-01-28',
    total: {
      views: (await storage.getItem<number>('counter:total')) || 0,
      visitors: (await storage.getItem<number>('counter:totalIP')) || 0
    },
    month: {
      period: currentMonth,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      views: (await storage.getItem<number>(`counter:month:${currentMonth}`)) || 0,
      visitors: (await storage.getItem<number>(`counter:monthIP:${currentMonth}`)) || 0
    },
    day: {
      date: today,
      views: (await storage.getItem<number>(`counter:day:${today}`)) || 0,
      visitors: (await storage.getItem<number>(`counter:dayIP:${today}`)) || 0
    }
  }
})
