import 'server-only';
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create different rate limiters for different actions
export const rateLimiters = {
    default: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "10 s"),
        analytics: true,
        prefix: "ratelimit:action:default",
    }),

    auth: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        analytics: true,
        prefix: "ratelimit:action:auth",
    }),

    sensitive: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(2, "60 s"),
        analytics: true,
        prefix: "ratelimit:action:sensitive",
    }),
}

export class RateLimitError extends Error {
    status: number
    reset: number
    limit: number
    remaining: number

    constructor(message: string, { limit, remaining, reset }: { limit: number; remaining: number; reset: number }) {
        super(message)
        this.name = "RateLimitError"
        this.status = 429
        this.limit = limit
        this.remaining = remaining
        this.reset = reset
    }
}

export async function withRateLimit<T>(
    action: () => Promise<T>,
    options: {
        identifier: string
        type?: keyof typeof rateLimiters
    },
): Promise<T> {
    const { identifier, type = "default" } = options
    const limiter = rateLimiters[type]

    // Check rate limit
    const { success, limit, remaining, reset } = await limiter.limit(identifier)

    if (!success) {
        throw new RateLimitError("Rate limit exceeded. Please try again later.", {
        limit,
        remaining,
        reset,
        })
    }

    // Execute the action if within rate limits
    return action()
}
