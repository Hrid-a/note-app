import {http, HttpResponse, passthrough} from 'msw'
import * as z from 'zod';

const emailReqScheme = z.object({
    to: z.string(),
    subject: z.string(),
    text: z.string(),
    html: z.string().optional(),
    from: z.string()
})
export const handlers = [
    http.post('https://api.resend.com/emails', async ({request})=>{
        const {data} = emailReqScheme.safeParse(await request.json());
        console.log('mocked 🔶', data)
        return HttpResponse.json({
            from: data?.from,
            to: data?.to,
            subject: data?.subject,
            text: data?.text,
            status: 'success mocked'
        })
    }),
    http.post('https://telemetry.nextjs.org/api/v1/record', () => {
        return passthrough() // Let the request go through normally
    }),
    http.get('http://localhost:3000/verify', () => {
        return passthrough() // Let the request go through normally
    }),
]