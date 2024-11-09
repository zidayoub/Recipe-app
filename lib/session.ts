import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  return authCookie ? JSON.parse(authCookie.value) : null;
}

export async function setSession(data: { username: string }) {
  const cookieStore = cookies();
  cookieStore.set('auth', JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete('auth');
}
