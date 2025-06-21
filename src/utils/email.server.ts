import {type ReactElement } from "react";
import { render } from '@react-email/components';



export async function sendEmail({react, ...options}: {
    to: string;
    subject: string;
} & (
    | { html: string; text: string; react?: never }
    | { react: ReactElement; html?: never; text?: never }
)) {
    const email = {
        from: 'notes_team@resend.dev',
        ...options,
        ...(react ? await renderReactEmail(react) : null)
    }
    
    
    const response = await fetch('https://api.resend.com/emails', {
        method:'POST',
        body: JSON.stringify(email),
        headers:{
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": 'application/json'
        }
    })

    const data = await response.json();
    if(!response.ok){
        return {status: 'error', message: data?.message} as const
    }

    return {status: 'success', message: 'Email sent successfully', data} as const
}

async function renderReactEmail(react: ReactElement) {
    const [html, text] = await Promise.all([
        render(react),
        render(react, { plainText: true })
    ]);
    return { html, text };
}

