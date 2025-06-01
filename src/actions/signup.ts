'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { signUpSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from '@/utils/db.server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { createSession } from '@/utils/session.server';

export async function signup(prevState:unknown, formData: FormData){

    const submission = await parseWithZod(formData,{
        schema: signUpSchema.superRefine(async (data, ctx)=>{

            const {email} = data;
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
            const {email, password} = data;
            const username = email.split('@')[0];

            const user = await prisma.user.create({
                data:{
                    email,
                    username,
                    password: {
                        create: {
                            hash: await bcrypt.hash(password, 10)
                        }
                    }
                },
                select:{id: true}
            })

            if(!user){
                ctx.addIssue({
                    code: 'custom',
                    message: 'An error occurred please try again later',
                })
                return z.NEVER;
            }

            return {...data, user}
        }),
        async: true,
    })
    
    if(submission.status !== 'success'){
        return submission.reply()
    }

    
    const {user} = submission.value;
    await createSession({id: user.id});
    redirect('/');
}