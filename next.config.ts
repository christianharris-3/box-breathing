import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    allowedDevOrigins: ['192.168.0.231', '192.168.0.94'],
    reactStrictMode: false
}

export default nextConfig;
