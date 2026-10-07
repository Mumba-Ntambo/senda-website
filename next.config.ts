import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores unrelated lockfiles
  // living higher up in the home directory.
  turbopack: {
    root: __dirname,
  },

  images: {
    /* Default is webp alone. AVIF lands ~20% smaller and browsers that
       lack it fall through to webp, so the only cost is a slower first
       encode per size — paid once, then cached. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
