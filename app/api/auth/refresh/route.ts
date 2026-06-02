/**
 * POST /api/auth/refresh  (FE-3 auth bridge)
 *
 * Re-mints a short-lived access token from the httpOnly refresh cookie.
 * Called by the client on mount (page reload) to restore the session
 * without ever exposing the refresh token to JS. The backend rotates the
 * refresh token on every use, so we re-set the cookie with the new value.
 *
 * Returns 401 (and clears the cookies) when there is no valid refresh
 * token — the client treats that as "logged out".
 */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  REFRESH_COOKIE,
  ROLE_COOKIE,
  clearedCookieOptions,
  refreshCookieOptions,
  roleCookieOptions,
} from '@/lib/auth-cookies';
import { toFrontendUser, type BackendAuthUser } from '@/lib/role-map';

const API = process.env.NEXT_PUBLIC_API_URL;

interface BackendAuthResult {
  accessToken: string;
  refreshToken: string;
  user: BackendAuthUser;
}

function unauthorized() {
  const response = NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  response.cookies.set(REFRESH_COOKIE, '', clearedCookieOptions(true));
  response.cookies.set(ROLE_COOKIE, '', clearedCookieOptions(false));
  return response;
}

export async function POST() {
  if (!API) {
    return NextResponse.json(
      { success: false, error: 'Backend API URL is not configured' },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return unauthorized();
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not reach the authentication service' },
      { status: 502 },
    );
  }

  if (!backendRes.ok) {
    // Expired / revoked / rotated-away refresh token → force re-login.
    return unauthorized();
  }

  const data = (await backendRes.json()) as BackendAuthResult;
  const user = toFrontendUser(data.user);

  const response = NextResponse.json({ success: true, user, accessToken: data.accessToken });
  response.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions());
  response.cookies.set(ROLE_COOKIE, user.role, roleCookieOptions());
  return response;
}
