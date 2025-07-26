import Redis from "ioredis"

// Default config
const WINDOW_SECONDS = 60
const MAX_REQUESTS = 100

// Try to connect to Redis if URL is defined
let redis: Redis | null = null
if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL)
  redis.on("error", (err: Error) => {
    console.warn("[rateLimiter] Redis error. Falling back to in-memory store.", err.message)
    redis = null
  })
}

// Fallback in-memory store (for dev/local)
const memoryStore = new Map<string, { count: number; expiresAt: number }>()

/**
 * Check rate limit for a given API key.
 * Throws an error if the limit is exceeded.
 */
export async function checkRateLimit(apiKey: string): Promise<void> {
  if (!apiKey) throw new Error("Missing API key for rate limit")

  const key = `ratelimit:${apiKey}`

  // Redis logic
  if (redis) {
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, WINDOW_SECONDS)
    if (count > MAX_REQUESTS) {
      throw new Error("Rate limit exceeded. Try again later.")
    }
    return
  }

  // In-memory fallback
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (!entry || now > entry.expiresAt) {
    memoryStore.set(key, {
      count: 1,
      expiresAt: now + WINDOW_SECONDS * 1000,
    })
  } else {
    entry.count++
    if (entry.count > MAX_REQUESTS) {
      throw new Error("Rate limit exceeded. Try again later.")
    }
  }
}
