import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "alanmalingi.wordpress.com" },
      { protocol: "https", hostname: "www.djkn.kemenkeu.go.id" },
      { protocol: "https", hostname: "indonesiatraveler.id" },
      { protocol: "https", hostname: "sdn28.bimakota.sch.id" },
      { protocol: "https", hostname: "petatematikindo.wordpress.com" },
    ],
  },
  output: "standalone",
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
