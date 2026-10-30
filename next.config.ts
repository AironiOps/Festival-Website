import type { NextConfig } from "next";

// Static export only. There is no server, no API route and no database.
// `npm run build` writes the deployable site to ./out
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
