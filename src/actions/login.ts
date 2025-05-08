'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";



export async function login(prevState:unknown, formData: FormData){

    // const username = formData.get('username');

    const submission = parseWithZod(formData,{
        schema: loginSchema
    })
    
    if(submission.status !== 'success'){
        console.log({ err: submission.error})
        return {
            status:'error', submission
        } as const;
    }

    const {email, password} = submission.value;
    console.log({email, password})
    redirect('/');
}