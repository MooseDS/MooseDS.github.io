/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

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
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metadata' }]],
  },
})
 
// MDX 구성과 Next.js 구성을 병합합니다
export default withMDX(nextConfig)
