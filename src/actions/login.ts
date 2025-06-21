'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";
import * as z from 'zod';
import { prisma } from '@/utils/db.server';
import { createSession } from '@/utils/session.server';
import bcrypt from 'bcryptjs';
import { requireAnonymos } from '@/utils/auth.server';
import { getSessionExpirationDate } from '@/utils/lib';


export async function login(prevState:unknown, formData: FormData){

    await requireAnonymos();
    const submission = await parseWithZod(formData,{
        schema: ()=> loginSchema.transform(async (data, ctx)=>{

            const userWithPassword = await prisma.user.findUnique({
                where: {
                    email: data.email
                },
                select: {
                    id: true,
                    password: {
                        select:{
                            hash: true
                        }
                    },
                }
            })

            if(!userWithPassword || !userWithPassword.password){
                ctx.addIssue({
                    code: 'custom',
                    message: 'Invalid email or password',
                })

                return z.NEVER;
            }

            const isPasswordValid = await bcrypt.compare(
                data.password,
                userWithPassword.password.hash
            );

            if(!isPasswordValid){
                ctx.addIssue({
                    code: 'custom',
                    message: 'Invalid email or password',
                })

                return z.NEVER;
            }

            const session = await prisma.session.create({
                data:{
                    expiredAt: getSessionExpirationDate(),
                    userId: userWithPassword.id
                },
                select:{
                    id: true, expiredAt: true
                }
            })

            return {...data, session}
        }),
        async: true,
    })

    delete submission.payload.password; 
    
    if(submission.status !== 'success'){
        return submission.reply();
    }

    const { session} = submission.value;

    await createSession({
        id: session.id,
        expiredAt: session.expiredAt
    });

    redirect('/');
}
