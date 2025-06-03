'use server';
import 'server-only';
import { redirect } from "next/navigation";
import { getSession } from "./session.server";
import { logout } from '@/actions/logout';
import { prisma } from './db.server';



export async function requireAnonymos() {
    const session = await getSession();

    if(session){
        redirect('/')
    }
}

export async function requireUserId({redirectTo=''}:{redirectTo?:string}={}) {
    const userId = await getUserId()

    if(!userId){
        // should be redirected based on the redirectTo
        console.log(redirectTo)
        redirect('/login')
    }

    return userId;
}

export async function getUserId() {

    const session = await getSession();

    if(!session?.id) return null;
    const user = await prisma.user.findUnique({
        where:{id: session.id},
        select:{id: true}
    })
    
    if(!user || !user?.id){
        throw await logout();
    }

    return user.id;
}

export async function requireUser() {
    const userId = await requireUserId();

    const user = await prisma.user.findUnique({
        where:{id: userId},
        select:{id: true}
    })
    
    if(!user || !user?.id){
        throw await logout();
    }

    return user;
}