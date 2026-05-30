# VIGISCAM Frontend

Next.js 16 + React 19 + Tailwind 4 + shadcn/ui. Calls the [VIGISCAM
backend](https://github.com/finauth2024/VIGISCAM-backend) over HTTPS.
Hosted on Vercel; DNS at NameCheap.

## Local dev

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local — at minimum, set NEXT_PUBLIC_API_URL and SESSION_COOKIE_SECRET.

pnpm dev          # http://localhost:3000
pnpm build        # production build, strict typecheck on
pnpm lint
```

The dev server proxies API calls to the URL in `NEXT_PUBLIC_API_URL`. The
default points at the Azure dev backend so the app works out of the box once
the env var is set. To run against a local backend, change it to
`http://localhost:3000/api/v1` and start the backend separately.

## Project layout

```
app/                # Next.js App Router pages
  api/              # Route Handlers that own the auth-cookie bridge
components/         # Reusable UI (Radix + shadcn)
lib/
  api-client.ts     # Typed HTTP client against the backend
  auth-context.tsx  # Auth state + login/logout
  generated/        # TYPES regenerated from backend OpenAPI (gitignored)
  hooks.ts          # SWR data hooks
  types.ts          # Frontend domain types
public/             # Static assets
styles/             # Tailwind
```

## Backend integration

API base + auth shape come from the backend's OpenAPI spec. Regenerate the
typed surface after any backend change:

```bash
pnpm openapi:types   # pulls openapi.json from $NEXT_PUBLIC_API_URL/docs-json
```

The flow:
1. User logs in via `POST /api/v1/auth/login`. Frontend stores the
   `accessToken` + `refreshToken` in **httpOnly cookies** set by a Next.js
   Route Handler (`app/api/auth/login/route.ts`) — never in `localStorage`.
2. Outgoing API calls go through `lib/api-client.ts`, which reads the cookie
   server-side or attaches the bearer client-side via a refresh-on-401
   wrapper.
3. CORS: the backend's `CORS_ORIGINS` must include the Vercel preview + prod
   URLs and the custom domain.

## Deployment

- **Vercel project** (auto-detect Next.js). Connect this repo; main → prod,
  PR previews on every PR.
- **Env vars** to set in the Vercel project (Production + Preview):
  - `NEXT_PUBLIC_API_URL` — `https://api.vigiscam.com/api/v1` once prod is up
  - `SESSION_COOKIE_SECRET` — random 32 bytes per environment
  - `SESSION_COOKIE_DOMAIN` — `.vigiscam.com` in prod, empty in preview
- **Custom domain**: NameCheap → CNAME `www` → Vercel; apex via Vercel-issued
  A record or ALIAS.
