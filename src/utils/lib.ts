import { headers } from 'next/headers'


const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30
export const getSessionExpirationDate = () =>
	new Date(Date.now() + SESSION_EXPIRATION_TIME)


export async function getRequestUrl() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  
  return `${protocol}://${host}`
}

export async function createUrl(path:string, baseUrl?:string) {
  const requestUrl = baseUrl || await getRequestUrl()
  return new URL(path, requestUrl)
}