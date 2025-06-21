'use server';
import { prisma } from '@/utils/db.server';
import { deleteSession, getSession } from '@/utils/session.server';
import { redirect } from 'next/navigation';
import 'server-only';

export async function logout() {
  const session = await getSession();
  if (session) {
    void prisma.session.deleteMany({where:{id: session.id}}).catch(()=>{});
    void deleteSession();
    redirect('/login');
  }
}


export async function logoutFromManySession(userId:string) {
  const session = await getSession();
  if (session) {
    await prisma.session.deleteMany({
      where:{ userId, id: {not: session.id}}
    })

    redirect('/settings');
  }
  redirect('/login')
  
}
