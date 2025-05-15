'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { noteActionSchema } from "./schema";


export async function handleNote(prevState: unknown, formData: FormData){

    const submission = parseWithZod(formData, {
        schema: noteActionSchema
    });
    

    if(submission.status !== 'success'){
        return {
            status: 'error',
            submission
        } as const;
    }

    
}