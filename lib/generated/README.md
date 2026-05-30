# Generated API types

`api-types.ts` is produced by `pnpm openapi:types` from the live VIGISCAM
backend's OpenAPI spec. Do not edit by hand — re-run the script after any
backend change.

The file is gitignored; CI generates it fresh on each deploy. To regenerate
locally:

```bash
# 1. Make sure NEXT_PUBLIC_API_URL points at the right backend env
echo $NEXT_PUBLIC_API_URL

# 2. Regenerate
pnpm openapi:types
```
