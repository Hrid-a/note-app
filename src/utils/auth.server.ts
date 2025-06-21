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
        console.log(redirectTo)
        redirect('/login')
    }

    return userId;
}

export async function getUserId() {

    const sessionData = await getSession();

    if(!sessionData?.id) return null;
    const session = await prisma.session.findUnique({
        where:{id: sessionData.id, expiredAt:{gt: new Date()}},
        select:{ user:{select:{id: true}}}
    })
    
    if(!session || !session?.user){
        throw await logout();
    }

    return session.user.id;
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

export async function requireOnBoardingEmail() {
    const session = await getSession({name:'n_onboarding'})
    if(!session) throw redirect('/signup');

    return session.id
}