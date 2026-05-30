/**
 * Next.js config.
 *
 * `typescript.ignoreBuildErrors: true` is a temporary v0-export holdover.
 * Chunk 2 of the backend integration (lib/types.ts ← OpenAPI) re-aligns the
 * domain models; once that lands this flag is removed and `next build` runs
 * `tsc` strictly. Tracked in task FE-2.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Add any image CDN hostnames here as needed.
    ],
  },
};

export default nextConfig;
