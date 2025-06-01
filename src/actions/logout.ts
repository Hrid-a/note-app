'use server';
import { deleteSession, getSession } from '@/utils/session.server';
import { redirect } from 'next/navigation';
import 'server-only';

export async function logout() {
  // Perform logout logic here
  const session = await getSession();
  if (session) {
    await deleteSession();
    redirect('/login');
  }
}

