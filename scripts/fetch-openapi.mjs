/**
 * Pull the live OpenAPI spec from the backend and write it to ./openapi.json.
 * Consumed by `pnpm openapi:types`, which then runs openapi-typescript over
 * the result and writes lib/generated/api-types.ts.
 *
 * Reads NEXT_PUBLIC_API_URL from the environment (or .env.local in dev) and
 * fetches `${baseUrl}/docs-json` — Swagger's standard spec endpoint, which
 * the backend exposes at `${apiPrefix}/docs-json` (i.e. /api/docs-json).
 *
 * Because NEXT_PUBLIC_API_URL contains the /api/v1 prefix, we strip the
 * trailing `/v1` before hitting `/docs-json`.
 */
import { writeFile } from 'node:fs/promises';

const base = process.env.NEXT_PUBLIC_API_URL;
if (!base) {
  console.error('NEXT_PUBLIC_API_URL is not set. Set it in .env.local or export it.');
  process.exit(1);
}

// .../api/v1  →  .../api
const docsRoot = base.replace(/\/v1\/?$/, '');
const url = `${docsRoot}/docs-json`;

console.log(`Fetching OpenAPI spec from ${url}`);
const res = await fetch(url);
if (!res.ok) {
  console.error(`Fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const spec = await res.json();
await writeFile('openapi.json', JSON.stringify(spec, null, 2), 'utf8');
console.log(`Wrote openapi.json (${Object.keys(spec.paths ?? {}).length} paths)`);
