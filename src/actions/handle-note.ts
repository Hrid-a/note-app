'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { noteActionSchema } from "./schema";
import { prisma } from '@/utils/db.server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function handleNote(prevState: unknown, formData: FormData){

    console.log(Object.fromEntries(formData.entries()));
    const submission = parseWithZod(formData, {
        schema: noteActionSchema
    });
    

    if(submission.status !== 'success'){
        
        return {
            status: 'error',
            submission: submission.reply()
        } as const;
    }

    switch(submission.value.intent){
        case 'archive': 
            // Handle archiving logic here
            return {
                status: 'success',
                message: 'Note archived successfully'
            } as const;
            break;
        case 'delete':
            // Handle deletion logic here
            const note = await prisma.note.findFirst({
                where:{
                    id: submission.value.id
                }
            })

            if(!note){
                return {
                    status: 'error',
                    message: 'Note not found',
                    submission: submission.reply()
                } as const;
            }

            await prisma.note.delete({
                where: {
                    id: note.id
                }
            })

            const cookieStore = await cookies();
            cookieStore.set({
                name: 'n_toast',
                value: JSON.stringify({
                    description: 'Note deleted successfully',
                    type: 'success'
                }),
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            })

            revalidatePath('/notes');
            redirect('/notes');
            break;
        default:
            return {
                status: 'error',
                message: 'Invalid action'
            } as const;
    }
}