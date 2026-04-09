/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const repo = 'MooseDS.github.io';

const nextConfig = {
  reactStrictMode: true,
  output: isProduction ? 'export' : undefined,
  basePath: isProduction ? '' : '',
  assetPrefix: isProduction ? '' : '',
  trailingSlash: true,
  images: {
    unoptimized: isProduction,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.velog.io',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
