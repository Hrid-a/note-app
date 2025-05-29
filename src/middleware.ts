import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const globalLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(130, '10 s'),
    analytics: true,
    prefix: 'ratelimit:global',
})

const apiLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(52, '10 s'),
    analytics: true,
    prefix: 'ratelimit:api',
})

const API_PATHS = ['/api/', '/action/']

export async function middleware(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous"
    const identifier = `${ip}:${request.nextUrl.pathname}`

    const isApiPath = API_PATHS.some(path => request.nextUrl.pathname.startsWith(path))
    const limiter = isApiPath ? apiLimiter : globalLimiter
    
    const { success, limit, remaining, reset } = await limiter.limit(identifier)
    
    const response = success 
        ? NextResponse.next() 
        : NextResponse.json(
            { error: 'Too Many Requests', message: 'Please try again later' },
            { status: 429 }
        )
    
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())
    
    return response
}

export const config = {
    matcher: [
    // Apply to all API routes
    '/api/:path*',
    // Apply to server action routes
    '/action/:path*',
    // Exclude static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
