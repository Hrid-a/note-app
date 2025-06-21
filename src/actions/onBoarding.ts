'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "./schema";
import { requireAnonymos, requireOnBoardingEmail } from "@/utils/auth.server";
import { prisma } from "@/utils/db.server";
import { getSessionExpirationDate } from "@/utils/lib";
import bcrypt from "bcryptjs";
import * as z from 'zod';
import { createSession } from "@/utils/session.server";
import { redirect } from "next/navigation";

export async function completeSignUp(prevState:unknown, formData:FormData) {
    await requireAnonymos();
    const email = await requireOnBoardingEmail()
    const submission = await parseWithZod(formData,{
        schema: onBoardingSchema.superRefine(async (data, ctx)=>{

            const alreadyExistsUser = await prisma.user.findUnique({
                where: { email },
                select: { id: true }
            });

            if(alreadyExistsUser){
                ctx.addIssue({
                    code: 'custom',
                    path: ['email'],
                    message: 'The user with this email already exists'
                });

                return;
            }

        }).transform(async (data, ctx)=>{
            const { password, name} = data;

            const session = await prisma.session.create({
                data:{
                    expiredAt: getSessionExpirationDate(),
                    user:{
                        create:{
                            email,
                            username: name,
                            password: {
                            create: {
                                hash: await bcrypt.hash(password, 10)
                            }
                        },
                        }
                    }
                },
                select:{id: true}
            })

            if(!session){
                ctx.addIssue({
                    code: 'custom',
                    message: 'An error occurred please try again later',
                })
                return z.NEVER;
            }

            return {...data, session}
        }),
        async: true,
    })
    
    if(submission.status !== 'success'){
        return submission.reply()
    }

    
    const {session} = submission.value;
    await createSession({id: session.id});
    redirect('/');
}