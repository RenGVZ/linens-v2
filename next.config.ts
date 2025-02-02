import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    domains: ["scontent.cdninstagram.com"],
    deviceSizes: [
      36, 56, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048,
      3840,
    ],
  },
}

export default nextConfig
