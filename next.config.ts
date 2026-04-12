import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactCompiler: true,

  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material', '@mui/icons-material'],
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
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://widgets.leadconnectorhq.com https://services.leadconnectorhq.com https://stcdn.leadconnectorhq.com https://connect.facebook.net https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai; img-src 'self' data: https: blob:; connect-src 'self' https://*.sanity.io https://registry.npmjs.org https://www.google-analytics.com https://analytics.google.com https://services.leadconnectorhq.com https://widgets.leadconnectorhq.com https://stcdn.leadconnectorhq.com https://content.apisystem.tech https://services.msgsndr.com; media-src 'self' data: blob: https://content.apisystem.tech https://cdn.sanity.io; frame-src https://www.youtube.com https://player.vimeo.com;",
          },
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
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: "/:path*.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.css",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
        destination: '/services/tax-filing-preparation',
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
        destination: '/en/services/tax-filing-preparation',
        permanent: true,
      },
      {
        source: '/es/services/tax-filing-and-preparation-services',
        destination: '/es/services/tax-filing-preparation',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
