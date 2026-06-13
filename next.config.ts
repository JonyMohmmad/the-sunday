import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // gray-matter and reading-time are CommonJS â€” transpile for ESM compatibility
  transpilePackages: ['gray-matter', 'reading-time'],
};

export default nextConfig;
