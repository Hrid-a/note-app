'use server';
import 'server-only';
import { parseWithZod } from "@conform-to/zod";
import { noteActionSchema } from "./schema";
import { prisma } from '@/utils/db.server';


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

            console.log('deleting note', submission.value.id);
            await prisma.note.delete({
                where: {
                    id: submission.value.id
                }
            })
            // revalidatePath('/notes');
            console.log('note deleted');
            return { status: 'success', message: 'this is fucking sick' } as const;
            
        default:
            return {
                status: 'error',
                message: 'Invalid action'
            } as const;
            break;
    }
}