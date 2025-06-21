'use server';
import 'server-only';
import {SignJWT, jwtVerify} from 'jose';
import { cookies } from 'next/headers';


const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

type SessionPayload = {
  id: string;
  expiredAt?: Date | number ,
};

export async function getSession({name}:{name?:string}={}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(name ??'n_session')?.value;

  if (!sessionCookie) {
    return null;
  }

  const sessionData = await decrypt(sessionCookie);
  return sessionData;
}

export async function createSession({id, expiredAt}: SessionPayload){

  const session = await encrypt({id});
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'n_session',
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiredAt ?? undefined
  });

}

export async function deleteSession(){
  const cookieStore = await cookies();
  cookieStore.delete('n_session');
}

async function encrypt(payload: {id: string} ){

  const result = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);

  return result;

}

export async function decrypt(session:string | undefined =''){

  try {

    const { payload } = await jwtVerify(session, SECRET, {
      algorithms: ['HS256'],
    })

    return payload as {id:string} | null;

  } catch {
    return null;

  }

}

export async function createOnBoardingSession({id}:{id:string}){

  const session = await encrypt({id});
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'n_onboarding',
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 10 * 60 * 1000)
  });

}