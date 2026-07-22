import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/course.oc-static.com/**",
      },
    ],
  },
};

export default nextConfig;
