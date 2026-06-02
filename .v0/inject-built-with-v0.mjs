/**
 * No-op stand-in for v0's "built with v0" injection script.
 *
 * The Vercel project's Build Command is configured as
 *   `node .v0/inject-built-with-v0.mjs && next build`
 * but the real injection script only exists inside v0's own hosting
 * environment — it is not part of this git repository. When Vercel builds
 * from a GitHub push, that file is missing and the build fails *before*
 * `next build` ever runs (MODULE_NOT_FOUND).
 *
 * This file makes the configured command succeed from a normal git deploy:
 * it does nothing and exits 0, so `&& next build` proceeds. The injected
 * badge is purely cosmetic and unnecessary for the production app.
 *
 * (Alternative fix: change the Vercel dashboard Build Command to plain
 * `next build`. This no-op keeps the repo self-sufficient either way.)
 */
// Intentionally empty.
