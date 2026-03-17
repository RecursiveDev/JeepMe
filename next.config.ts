import type { NextConfig } from "next";
import path from "path";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Enable static export for GitHub Pages
  output: isStaticExport ? "export" : undefined,
  // Base path for GitHub Pages deployment (repo name)
  basePath: isStaticExport ? "/JeepMe" : undefined,
  // Disable image optimization for static export (no server)
  images: isStaticExport
    ? {
        unoptimized: true,
      }
    : undefined,
};

export default nextConfig;