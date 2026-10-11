/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  // The original pages predate the lint rules; don't let style warnings block deploys.
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
