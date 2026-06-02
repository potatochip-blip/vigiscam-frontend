/**
 * POST /api/auth/logout  (FE-3 auth bridge)
 *
 * Best-effort revokes the refresh token at the backend, then clears both
 * auth cookies regardless of the backend's response (logout must always
 * succeed locally).
 */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { REFRESH_COOKIE, ROLE_COOKIE, clearedCookieOptions } from '@/lib/auth-cookies';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (API && refreshToken) {
    try {
      await fetch(`${API}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Ignore — local cookie clear below is what matters for the user.
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(REFRESH_COOKIE, '', clearedCookieOptions(true));
  response.cookies.set(ROLE_COOKIE, '', clearedCookieOptions(false));
  return response;
}
