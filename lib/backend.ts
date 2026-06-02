/**
 * Typed `openapi-fetch` client against the live VIGISCAM backend, using the
 * spec-generated `paths` from `lib/generated/api-types.ts`.
 *
 * Consumers should NOT import this directly from pages — it speaks the
 * backend's wire shape (UPPER_SNAKE enums, Prisma field names). Page-level
 * code goes through `lib/api-client.ts`, which wraps this and maps the
 * shapes back to the frontend's lowercase-kebab world via `lib/mappers.ts`.
 *
 * Why a wrapper exists at all: the v0-exported frontend uses different field
 * names than the backend (e.g. `indicator` vs `indicatorValue`, lowercase
 * vs UPPER_SNAKE statuses). Letting pages call this directly would force a
 * sweeping rename across ~50 files. The wrapper absorbs the difference and
 * keeps chunk-2 surgical.
 */
import createClient from 'openapi-fetch';
import type { paths } from './generated/api-types';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!rawBaseUrl && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.error(
    'NEXT_PUBLIC_API_URL is not set. The frontend cannot reach the backend ' +
      '— check Vercel / .env.local.',
  );
}

/**
 * The generated `paths` keys already include the `/api/v1` prefix (the spec is
 * exported with the global prefix), so the openapi-fetch baseUrl must be the
 * ORIGIN only. NEXT_PUBLIC_API_URL carries the `/api/v1` suffix (the auth route
 * handlers append `/auth/...` to it), so we strip it here to avoid a doubled
 * `/api/v1/api/v1/...` path.
 */
const baseUrl = (rawBaseUrl ?? '').replace(/\/api\/v\d+\/?$/, '');

/**
 * The shared bearer token, populated by `setAuthToken()` after a successful
 * login. Lives in memory only on the client — the canonical store is the
 * httpOnly cookie set by `app/api/auth/login/route.ts` (chunk FE-3).
 *
 * Server-side rendering reads the cookie directly via `cookies()` rather
 * than going through this variable.
 */
let accessToken: string | null = null;
export function setAuthToken(token: string | null): void {
  accessToken = token;
}
export function getAuthToken(): string | null {
  return accessToken;
}

export const backend = createClient<paths>({
  baseUrl,
  // openapi-fetch supports a per-request `headers` arg too; this default lets
  // every call automatically pick up the current token.
  fetch: (request) => {
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return fetch(request);
  },
});

export type Backend = typeof backend;
