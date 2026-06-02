/**
 * Server-side cookie configuration for the FE-3 auth bridge.
 *
 * Security model:
 *  - `vigiscam_refresh` — the long-lived refresh token. **httpOnly** so client
 *    JS can never read it (XSS can't exfiltrate it). The browser sends it only
 *    to same-origin `/api/auth/*` route handlers, which forward it to the
 *    backend server-to-server.
 *  - `vigiscam_role` — the mapped frontend role only (no token). **Readable**
 *    by the edge middleware for SSR route guards. Contains no secret.
 *
 * The short-lived access token is deliberately NOT stored in a cookie — it
 * lives in client memory (lib/backend.ts `setAuthToken`) and is re-minted from
 * the refresh cookie on reload via POST /api/auth/refresh.
 */
export const REFRESH_COOKIE = 'vigiscam_refresh';
export const ROLE_COOKIE = 'vigiscam_role';

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;

/** The subset of cookie options we set — matches NextResponse.cookies.set. */
export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  path?: string;
  maxAge?: number;
}

export function refreshCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SEVEN_DAYS_SECONDS,
  };
}

export function roleCookieOptions(): CookieOptions {
  return {
    httpOnly: false, // middleware (edge) must read this for route guards
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SEVEN_DAYS_SECONDS,
  };
}

/** Options for clearing a cookie (maxAge 0). */
export function clearedCookieOptions(httpOnly: boolean): CookieOptions {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  };
}
