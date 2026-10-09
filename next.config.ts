import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getContentSecurityPolicy } from "./src/lib/security/content-security-policy";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Allow concurrent local dev servers to use isolated build output directories.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p1x9y3wz"}/**`,
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Cold builds exhausted memory in the optional React Compiler's Babel workers.
  reactCompiler: false,

  // Enable experimental optimizations
  experimental: {
    serverActions: { bodySizeLimit: "32kb" },
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  async headers() {
    return [
      {
        source: "/(intake|book|hq|api/submit-application|api/submit-restaurant-application|api/survey|/)/:path*",
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
      {
        source: "/scorp-estimator/results",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/hq/:path*",
        headers: [{ key: "Content-Security-Policy", value: getContentSecurityPolicy(undefined, true) }],
      },
      {
        source: "/:locale/shop/success",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      // Next.js owns caching for generated JS/CSS. Its development filenames are
      // stable, so marking them immutable can hydrate fresh HTML with stale code.
      {
        source: "/:path*.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/services/back-taxes-irs-tax-resolution',
        destination: '/back-taxes-irs-tax-resolution',
        permanent: true,
      },
      {
        source: '/en/services/back-taxes-irs-tax-resolution',
        destination: '/en/back-taxes-irs-tax-resolution',
        permanent: true,
      },
      {
        source: '/es/services/back-taxes-irs-tax-resolution',
        destination: '/es/back-taxes-irs-tax-resolution',
        permanent: true,
      },
      {
        source: '/construction',
        destination: '/industries/construction',
        permanent: true,
      },
      {
        source: '/restaurants',
        destination: '/industries/restaurants',
        permanent: true,
      },
      {
        source: '/services/tax-filing-and-preparation-services',
        destination: '/tax-preparation-and-filing',
        permanent: true,
      },
      // Locale-aware redirects
      {
        source: '/en/construction',
        destination: '/en/industries/construction',
        permanent: true,
      },
      {
        source: '/es/construction',
        destination: '/es/industries/construction',
        permanent: true,
      },
      {
        source: '/en/restaurants',
        destination: '/en/industries/restaurants',
        permanent: true,
      },
      {
        source: '/es/restaurants',
        destination: '/es/industries/restaurants',
        permanent: true,
      },
      {
        source: '/en/services/tax-filing-and-preparation-services',
        destination: '/en/tax-preparation-and-filing',
        permanent: true,
      },
      {
        source: '/es/services/tax-filing-and-preparation-services',
        destination: '/es/tax-preparation-and-filing',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
