import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ensures better debugging
  experimental: {
    serverActions: {}, // ✅ Fix: Empty object instead of 'true'
  },
  images: {
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
