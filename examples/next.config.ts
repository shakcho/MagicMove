import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the linked local package to be transpiled
  transpilePackages: ["magicmove"],
};

export default nextConfig;

