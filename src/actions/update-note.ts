'use server';
import 'server-only';

import { parseWithZod } from "@conform-to/zod";
import { noteSchema } from "./schema";


export async function updateNote(prevState: unknown, formData: FormData) {

    const submission = parseWithZod(formData, {
        schema: noteSchema
    });
    console.log({ submission });
    if(submission.status !== 'success'){
        return {
            status: 'error',
            submission
        } as const;
    }
}