/**
 * POST /api/auth/login  (FE-3 auth bridge)
 *
 * Proxies a real login to the VIGISCAM backend, then:
 *  - stores the refresh token in an httpOnly cookie (never readable by JS)
 *  - stores the mapped role in a readable cookie for the edge middleware
 *  - returns the user profile + short-lived access token to the client,
 *    which holds the access token in memory (lib/backend.ts setAuthToken)
 *
 * The backend's `/auth/login` returns
 *   { accessToken, refreshToken, user: { id, email, fullName, tenantId, role } }
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

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: 'Email and password are required' },
      { status: 400 },
    );
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not reach the authentication service' },
      { status: 502 },
    );
  }

  if (!backendRes.ok) {
    // 401 from the backend = bad credentials. Anything else = upstream issue.
    const status = backendRes.status === 401 ? 401 : 502;
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status });
  }

  const data = (await backendRes.json()) as BackendAuthResult;
  const user = toFrontendUser(data.user);

  const response = NextResponse.json({ success: true, user, accessToken: data.accessToken });
  response.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions());
  response.cookies.set(ROLE_COOKIE, user.role, roleCookieOptions());
  return response;
}
