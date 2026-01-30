import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
        port: '',
      },
      {
        protocol: "https",
        hostname: "assets.codepen.io",
        pathname: "/**",
        port: '',
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
        pathname: "/**",
        port: '',
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/**",
        port: '',
      },
      {
        protocol: "https",
        hostname: "i1.sndcdn.com",
        pathname: "/**",
        port: '',
      },
    ],
  },
};

export default nextConfig;
