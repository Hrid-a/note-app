'use server';
import 'server-only';
import { prisma } from "./db.server";
import { getSession } from './session.server';
import { redirect } from 'next/navigation';

export async function getAllNotes(){

    const session = await getSession();

    if(!session || !session.id){
        redirect('/login');
    }

    const notes = await prisma.note.findMany({
        where:{ownerId: session.id},
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