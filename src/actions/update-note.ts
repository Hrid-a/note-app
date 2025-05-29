'use server';
import 'server-only';

import { parseWithZod } from "@conform-to/zod";
import { noteSchema } from "./schema";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/utils/db.server';


export async function updateNote(prevState: unknown, formData: FormData) {

    console.log(Object.fromEntries(formData.entries()));
    // Parse the form data using the noteSchema
    const submission = parseWithZod(formData, {
        schema: noteSchema
    });
    console.log({ submission });
    if(submission.status !== 'success'){
        return submission.reply();
    }

    console.log('submission value', submission.value);

    const {title, content, id} = submission.value;
    const note = await prisma.note.upsert({
        where:{ id},
        update: {
            title,
            content
        },
        create: {
            title,
            content,
            ownerId: 'cmalhdv1l000legko9pj8bne0' // this should be dynamic, change later
        },
    })

    revalidatePath('/notes');
    revalidatePath(`/${note.id}`);
    return {
        status: 'success',
        id: note.id,
    } as const;


}