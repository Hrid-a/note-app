'use server';
import 'server-only';
import { prisma } from "./db.server";

export async function getAllNotes({id}:{id: string}){

    const notes = prisma.note.findMany({
        where:{ownerId: id},
        select: {title: true, createdAt: true, id: true}
    })

    return notes;
}


export async function getNoteById({id}:{id:string}) {
    if(id === 'new'){
        return {
            id: 'new',
            title: '',
            content: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
    
    const note = prisma.note.findFirst({
        where:{id},
        select:{
            id: true, title: true, content: true, createdAt: true, updatedAt: true
        }
    }) 

    return note;
}