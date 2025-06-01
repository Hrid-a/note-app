'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";
import * as z from 'zod';
import { prisma } from '@/utils/db.server';
import { createSession } from '@/utils/session.server';



export async function login(prevState:unknown, formData: FormData){

    // const username = formData.get('username');

    const submission = await parseWithZod(formData,{
        schema: ()=> loginSchema.transform(async (data, ctx)=>{

            const user = await prisma.user.findUnique({
                where: {
                    email: data.email
                },
                select: {
                    id: true,
                }
            })

            if(!user){
                ctx.addIssue({
                    code: 'custom',
                    message: 'Invalid email or password',
                })

                return z.NEVER;
            }

            return {...data, user}
        }),
        async: true,
    })

    delete submission.payload.password; // remove password from payload
    
    if(submission.status !== 'success'){
        console.log({ err: submission.error})
        return submission.reply();
    }

    const {email, password, user} = submission.value;
    console.log({email, password, user})

    await createSession({
        id: user.id
    });

    redirect('/');
}
