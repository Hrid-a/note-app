'use server';
import 'server-only';

import { parseWithZod } from "@conform-to/zod";
import { noteSchema } from "./schema";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/utils/db.server';
import { redirect } from 'next/navigation';


export async function updateNote(prevState: unknown, formData: FormData) {

    const submission = parseWithZod(formData, {
        schema: noteSchema
    });
    if(submission.status !== 'success'){
        return submission.reply();
    }

    console.log({submission});
    const {title, content, id} = submission.value;
    const note = await prisma.note.upsert({
        where:{ id },
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
    redirect(`/notes/${note.id}`);

}