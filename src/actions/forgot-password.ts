'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { forgotPasswordSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from '@/utils/db.server';
import {  requireAnonymos } from '@/utils/auth.server';
import { sendEmail } from '@/utils/email.server';
import { generateTOTP } from '@epic-web/totp';
import { createUrl } from '@/utils/lib';
import { createOnBoardingSession } from '@/utils/session.server';
import * as z from 'zod';
import { ForgotPasswordEmail } from '@/utils/emails';

export async function forgotPassword(prevState:unknown, formData: FormData){

    await requireAnonymos();
    const submission = await parseWithZod(formData,{
        schema: forgotPasswordSchema.superRefine(async (data, ctx)=>{

            const {email} = data;
            const user = await prisma.user.findUnique({
                where: { email },
                select: { id: true }
            });

            if(!user){
                ctx.addIssue({
                    code: 'custom',
                    path: ['email'],
                    message: 'The user with this email does not exist'
                });

                return z.NEVER;
            }

        }),
        async: true,
    })
    
    if(submission.status !== 'success'){
        return submission.reply()
    }
    
    const {email} = submission.value;

    const {otp, ...otpConfig} = await generateTOTP({
        algorithm: 'SHA-256',
        period: 10 * 60
    })


    const redirectUrl =  await createUrl('/verify');
    redirectUrl.searchParams.set('type', 'reset-password');
    redirectUrl.searchParams.set('target', email);

    const verifyUrl = new URL(redirectUrl);
    verifyUrl.searchParams.set('code', otp);

    const verifactionData = {
        type: 'reset-password',
        target: email,
        ...otpConfig,
        expiresAt: new Date(Date.now() + otpConfig.period * 1000),
    }
    await prisma.verifaction.upsert({
        where: {
            target_type: {
                type: 'reset-password',
                target: email
            }
        },
        update: verifactionData,
        create: verifactionData
    })


    const response = await sendEmail({to: email, subject:'Email verfication', react: ForgotPasswordEmail({
        onboardingUrl: verifyUrl.href,
        otp
    })});

    if(response.status !== 'success'){
        return submission.reply({ formErrors: [response.message ?? 'please try again'] })
    }
    await createOnBoardingSession({id: email});
    redirect(redirectUrl.toString());
}