import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  module.exports = {
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    },
  };
};

export default nextConfig;
