/**
 * POST /api/auth/signup  (FE-3 auth bridge)
 *
 * Registers a new account against the VIGISCAM backend `/auth/register`,
 * which creates the user + their personal tenant and returns the same
 * AuthResult shape as login (already logged in). We set the same cookies
 * as the login route so signup lands the user straight into the app.
 */
import { NextResponse } from 'next/server';
import {
  REFRESH_COOKIE,
  ROLE_COOKIE,
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

export async function POST(request: Request) {
  if (!API) {
    return NextResponse.json(
      { success: false, error: 'Backend API URL is not configured' },
      { status: 500 },
    );
  }

  let body: { email?: string; password?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
  const { email, password, name } = body;
  if (!email || !password || !name) {
    return NextResponse.json(
      { success: false, error: 'Email, password and name are required' },
      { status: 400 },
    );
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName: name }),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not reach the authentication service' },
      { status: 502 },
    );
  }

  if (!backendRes.ok) {
    // 409 = email already registered; surface that distinctly.
    if (backendRes.status === 409) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { success: false, error: 'Could not create the account' },
      { status: backendRes.status >= 400 && backendRes.status < 500 ? 400 : 502 },
    );
  }

  const data = (await backendRes.json()) as BackendAuthResult;
  const user = toFrontendUser(data.user);

  const response = NextResponse.json({ success: true, user, accessToken: data.accessToken });
  response.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions());
  response.cookies.set(ROLE_COOKIE, user.role, roleCookieOptions());
  return response;
}
