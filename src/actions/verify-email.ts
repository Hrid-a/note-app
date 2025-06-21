'use server';
import 'server-only';
import {  requireOnBoardingEmail } from '@/utils/auth.server';
import { parseWithZod } from '@conform-to/zod';
import 'server-only';
import { verifactionSchema } from './schema';
import { prisma } from '@/utils/db.server';
import { verifyTOTP } from '@epic-web/totp';
import * as z from 'zod'
import { createOnBoardingSession, createSession } from '@/utils/session.server';
import { redirect } from 'next/navigation';
import { sendEmail } from '@/utils/email.server';
import { EmailChangeNoticeEmail } from '@/utils/emails';
import { cookies } from 'next/headers';

export async function verify(prevState:unknown, formData: FormData) {
    console.log('verifaction action called');
    await requireOnBoardingEmail();
    const submission = await parseWithZod(formData,{
        schema: verifactionSchema.superRefine(async (data, ctx)=>{

            const {target, code, type} = data;
            const verifaction = await prisma.verifaction.findUnique({
                where: { target_type:{target, type}, OR:[{expiresAt:{gt: new Date()}}, {expiresAt: undefined}] },
                select: { secret: true, period: true, digits: true, algorithm: true, charSet:true,  }
            });

            if(!verifaction){ 
                ctx.addIssue({
                    code: 'custom',
                    path: ['code'],
                    message: 'Invalid Code verifaction',
                });

                return z.NEVER;
            }

            const isValid = await verifyTOTP({
                otp: code,
                secret: verifaction.secret,
                algorithm: verifaction.algorithm,
                digits: verifaction.digits,
                period: verifaction.period,
                charSet: verifaction.charSet
            })
            
            if(!isValid){
                ctx.addIssue({
                    code: 'custom',
                    path: ['code'],
                    message: 'Invalid code'
                });

                return z.NEVER;
            }

            await prisma.verifaction.delete({
                where:{target_type: {target, type}}
            })

            return data;
        }),
        async: true,
    })
    
    if(submission.status !== 'success'){
        return submission.reply()
    }

    const {target, type} = submission.value

    if(type === 'onboarding'){
        await createOnBoardingSession({id: target});
        redirect('/onboarding');
    }
    if(type === 'reset-password'){
        await createOnBoardingSession({id: target});
        redirect('/reset-password');
    }

    if(type === 'change-email'){
        console.log('change email', target);
        const email = await requireOnBoardingEmail();
        if(!email){
            return submission.reply({ formErrors: ['You must submit the code on the same device that requested the email change.'] });
        }

        const shouldUpdateUser = await prisma.user.findFirstOrThrow({
            where: { id: target },
            select: { email: true }
        });


        const user = await prisma.user.update({
            where:{id: target},
            data:{email},
            select: { id: true, email: true, username: true },
        });


        void sendEmail({
            to: shouldUpdateUser.email,
            subject: 'Notes Email Changed',
            react: EmailChangeNoticeEmail({userId: user.id})
        })

        const cookieStore = await cookies();
        cookieStore.delete('n_onboarding');

        cookieStore.set({
            name: 'n_toast',
            value: JSON.stringify({
                description: 'Email changed successfully',
                type: 'success'
            }),
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        }) 
        const session = await prisma.session.create({
            data:{
                userId: user.id,
                expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
            },
            select:{
                id: true, expiredAt: true
            }
        })
        await createSession({
        id: session.id,
        expiredAt: undefined
        });
        redirect('/settings');
    }
}