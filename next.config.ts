import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(intake|hq|api/submit-application|api/submit-restaurant-application|api/survey|/)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, private",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
