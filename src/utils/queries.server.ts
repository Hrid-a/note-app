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
    const note = prisma.note.findUnique({
        where:{id},
        select:{
            id: true, title: true, content: true, createdAt: true, updatedAt: true
        }
    }) 

    return note;
}