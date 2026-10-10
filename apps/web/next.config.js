/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@astris/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.myastris.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

module.exports = nextConfig;
