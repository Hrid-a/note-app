'use server';
import 'server-only';

import { parseWithZod } from "@conform-to/zod";
import { noteSchema } from "./schema";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/utils/db.server';
import { redirect } from 'next/navigation';
import { getUserId } from '@/utils/auth.server';


export async function updateNote(prevState: unknown, formData: FormData) {

    const submission = parseWithZod(formData, {
        schema: noteSchema
    });
    if(submission.status !== 'success'){
        return submission.reply();
    }
    const userId = await getUserId()
    if(!userId) redirect('/login');

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
            ownerId: userId
        },
    })

    revalidatePath('/notes');
    redirect(`/notes/${note.id}`);

}