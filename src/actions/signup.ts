'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { signUpSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";



export async function signup(prevState:unknown, formData: FormData){

    const submission = parseWithZod(formData,{
        schema: signUpSchema
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