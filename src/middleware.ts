import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { decrypt } from './utils/session.server'


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
const publicRoutes = ['/login', '/signup', '/onboarding', '/verify', '/forgot-password', '/reset-password',];

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('n_session')
    const {pathname} = request.nextUrl;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous"
    const identifier = `${ip}:${pathname}`

    const isApiPath = API_PATHS.some(path => pathname.startsWith(path))
    const isPublicRoute = publicRoutes.some(path => pathname.startsWith(path));

    const limiter = isApiPath ? apiLimiter : globalLimiter
    
    const { success, limit, remaining, reset } = await limiter.limit(identifier)
    
    if(!success) {
        return NextResponse.json(
                { error: 'Too Many Requests', message: 'Please try again later' },
                { status: 429 }
            );
    }

    

    if(!isPublicRoute && !sessionCookie){
        console.log('No session cookie found for path:', {pathname, isPublicRoute, sessionCookie});
        return NextResponse.redirect(new URL('/login', request.url))
    }
    

    const response =  NextResponse.next() 
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())
    
    if(sessionCookie && request.method === 'GET'){
        try{
            const parsed = await decrypt(sessionCookie.value);
            if(!parsed) return NextResponse.redirect(new URL('/login', request.url))

        }catch{
            response.cookies.delete('n_session');
            if(!isPublicRoute){
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }
    }
    
    
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
