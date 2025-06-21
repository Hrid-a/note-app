'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { changeEmailSchema } from "./schema";
import { requireUserId } from "@/utils/auth.server";
import { generateTOTP } from "@epic-web/totp";
import { createUrl } from "@/utils/lib";
import { prisma } from "@/utils/db.server";
import { sendEmail } from "@/utils/email.server";
import { EmailChangeEmail } from "@/utils/emails";
import { createOnBoardingSession, deleteSession } from "@/utils/session.server";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function changeEmail(prevState: unknown, formData: FormData){
    const userId = await requireUserId();

    const submission = await parseWithZod(formData, { 
        schema: changeEmailSchema.superRefine(async (data, ctx) => {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email },
                select: { id: true }
            });

            if(existingUser){
                ctx.addIssue({
                    code: 'custom',
                    message: 'Email already exists',
                    path: ['email']
                })

                return z.NEVER;
            }

            return data;
        }),
        async: true
    });

    if(submission.status !== 'success'){
        return submission.reply();
    }

    const { email } = submission.value;

    // n_onboarding

    const {otp, ...otpConfig} = await generateTOTP({
        algorithm: 'SHA-256',
        period: 10 * 60
    })

    
    const redirectUrl =  await createUrl('/verify');
    redirectUrl.searchParams.set('type', 'change-email');
    redirectUrl.searchParams.set('target', userId);

    const verifyUrl = new URL(redirectUrl);
    verifyUrl.searchParams.set('code', otp);

    const verifactionData = {
        type: 'change-email',
        target: userId,
        ...otpConfig,
        expiresAt: new Date(Date.now() + otpConfig.period * 1000),
    }
    await prisma.verifaction.upsert({
        where: {
            target_type: {
                type: 'change-email',
                target: userId
            }
        },
        update: verifactionData,
        create: verifactionData
    })

    const response = await sendEmail({to: email, subject:'Notes Email change verfication', react: EmailChangeEmail({verifyUrl: verifyUrl.toString(), otp})});

    if(response.status !== 'success'){
        return submission.reply({ formErrors: [response.message ?? 'please try again'] })
    }

    await deleteSession()

    await createOnBoardingSession({id: email});
    redirect(redirectUrl.href);
}