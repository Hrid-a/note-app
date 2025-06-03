'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { getSession } from "./session.server";
import { prisma } from './db.server';
import { logout } from '@/actions/logout';



export async function requireAnonymos() {
    const session = await getSession();

    if(session){
        redirect('/')
    }
}

export async function requireUserId() {
    const userId = await getUserId()
    if(!userId){
        redirect('/login')
    }

    return userId;
}

export async function getUserId() {

    const session = await getSession();

    if(!session?.id) return null;
    const user = await prisma.user.findUnique({select: {id: true}, where:{id: session.id}});
    if(!user?.id){
        throw await logout();
    }

    return user.id;
}