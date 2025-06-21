'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { requireAnonymos, requireOnBoardingEmail } from "@/utils/auth.server";
import { prisma } from "@/utils/db.server";
import bcrypt from "bcryptjs";
import * as z from 'zod';
import { redirect } from "next/navigation";
import { resetPasswordSchema } from './schema';
import { cookies } from 'next/headers';

export async function resetPassword(prevState:unknown, formData:FormData) {
    await requireAnonymos();
    const email = await requireOnBoardingEmail();
    const submission = await parseWithZod(formData,{
        schema: resetPasswordSchema.superRefine(async (data, ctx)=>{

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

    await prisma.user.update({
        where:{email},
        data:{
            password: {
                update: {
                    hash: await bcrypt.hash(submission.value.password, 10)
                }
            }
        },
        select: {id: true}
    })

    const cookieStore = await cookies();
    cookieStore.delete('n_onboarding');
    
    redirect('/login');
}