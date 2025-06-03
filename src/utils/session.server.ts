'use server';
import 'server-only';
import {SignJWT, jwtVerify} from 'jose';
import { cookies } from 'next/headers';


const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

type SessionPayload = {
  id: string;
};

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('n_session')?.value;

  if (!sessionCookie) {
    return null;
  }

  const sessionData = await decrypt(sessionCookie);
  return sessionData;
}

export async function createSession(sessionData: SessionPayload){

  const session = await encrypt(sessionData);
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'n_session',
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

}

export async function deleteSession(){
  const cookieStore = await cookies();
  cookieStore.delete('n_session');
}

async function encrypt(payload: SessionPayload){

  const result = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);

  return result;

}

async function decrypt(session:string | undefined =''){

  try {

    const { payload } = await jwtVerify(session, SECRET, {
      algorithms: ['HS256'],
    })

    return payload as {id:string} | null;

  } catch (error) {
    console.error('Session decryption failed:', error);
    return null;

  }

}