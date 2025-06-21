// instrumentation.ts
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.MOCK === "true") {
        const { server } = await import('@/mocks/server');
        
        server.listen({
            onUnhandledRequest: (req) => {
                // Only warn about non-telemetry requests
                if (!req.url.includes('telemetry.nextjs.org')) {
                    console.warn(`MSW: Unhandled ${req.method} request to ${req.url}`)
                }
            }
        });
        
        console.log('🎭 MSW server started for mocking')
        
        // Cleanup on process exit
        process.on('SIGINT', () => server.close())
        process.on('SIGTERM', () => server.close())
    }
}