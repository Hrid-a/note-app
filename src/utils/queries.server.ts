'use server';
import 'server-only';
import { prisma } from "./db.server";
import { redirect } from 'next/navigation';
import { getUserId } from './auth.server';

export async function getAllNotes(){

    const userId = await getUserId();

    if(!userId){
        redirect('/login');
    }

    const notes = await prisma.note.findMany({
        where:{ownerId: userId},
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


export async function getUser({id}:{id:string}) {
    const user = await prisma.user.findUnique({
        where:{id},
        select:{id: true, username: true, createdAt: true, 
            image:{select:{id: true}}, _count:{select:{session:{
                where:{
                    expiredAt: {gt: new Date()}
                }
            }}}}
    })
    
    return user;
}